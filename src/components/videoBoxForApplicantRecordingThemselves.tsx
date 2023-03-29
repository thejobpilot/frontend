import React, { useRef, useState } from 'react';
import { Box, Button, Paper, Typography, useTheme } from '@mui/material';

const VideoRecorder = () => {
    const videoRef = useRef(null);
    const [recording, setRecording] = useState(false);
    const [videoURL, setVideoURL] = useState('');
    const theme = useTheme();

    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        videoRef.current.play();

        const mediaRecorder = new MediaRecorder(stream);
        const chunks = [];

        mediaRecorder.ondataavailable = (event) => {
            chunks.push(event.data);
        };

        mediaRecorder.onstop = () => {
            const blob = new Blob(chunks, { type: 'video/webm' });
            const url = URL.createObjectURL(blob);
            setVideoURL(url);
            setRecording(false);
        };

        mediaRecorder.start();
        setRecording(true);
    };

    const stopRecording = () => {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
        videoRef.current.srcObject = null;
    };

    return (
        <Box
            component={Paper}
            sx={{
                position: 'fixed',
                bottom: theme.spacing(2),
                left: theme.spacing(2),
                width: 400,
                height: 300,
                margin: theme.spacing(2),
                padding: theme.spacing(2),
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {videoURL ? (
                <video src={videoURL} controls width="360" height="240" />
            ) : (
                <Box
                    sx={{
                        width: 360,
                        height: 240,
                        border: '1px solid black',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <video ref={videoRef} width="360" height="240" style={{ display: 'none' }} />
                    <Typography variant="h6" color="text.secondary">Recording...</Typography>
                </Box>
            )}
            <Box sx={{ marginTop: theme.spacing(2) }}>
                {recording ? (
                    <Button variant="contained" onClick={stopRecording}>Stop Recording</Button>
                ) : (
                    <Button variant="contained" onClick={startRecording}>Start Recording</Button>
                )}
            </Box>
        </Box>
    );
};

export default VideoRecorder;
