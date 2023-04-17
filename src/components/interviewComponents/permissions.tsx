import React, { useRef, useState } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';

const Permissions: React.FC = () => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      mediaRecorderRef.current = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        setRecordedBlob(blob);

        if (videoRef.current && videoRef.current.srcObject) {
          const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
          tracks.forEach((track) => track.stop());
          videoRef.current.src = URL.createObjectURL(blob);
          videoRef.current.srcObject = null;
        }
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', justifyContent: 'center' }}>
        <Typography variant="h4" mb={3}>
          Permissions Test Page
        </Typography>
        <Box mb={3}>
          <video ref={videoRef} autoPlay playsInline muted controls width="100%" />
        </Box>
        <Box mb={3}>
          {!isRecording && (
            <Button variant="contained" color="primary" onClick={handleStartRecording}>
              Start Recording
            </Button>
          )}
          {isRecording && (
            <Button variant="contained" color="secondary" onClick={handleStopRecording}>
              Stop Recording
            </Button>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Permissions;
