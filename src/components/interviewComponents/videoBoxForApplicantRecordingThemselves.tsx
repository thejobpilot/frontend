import React, { useRef, useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import {
    PlayCircle,
  RadioButtonChecked,
  RestartAlt,
  StopCircle,
} from "@mui/icons-material";

interface VideoRecorderProps {
  onRecordingComplete: (blob: Blob) => void;
  reset: boolean;
  currentQuestionIndex: number;
}

const VideoRecorder: React.FC<VideoRecorderProps> = ({
  onRecordingComplete,
  reset,
  currentQuestionIndex,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [attempts, setAttempts] = useState(0);
  const maxAttempts = 3;

  const initMediaRecorder = async () => {
    if (videoRef.current && !mediaRecorder) {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      videoRef.current.srcObject = stream;

      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
    }
  };

  useState(currentQuestionIndex);
  useEffect(() => {
    const resetVideo = async () => {
      if (videoRef.current) {
        setAttempts(0);
        videoRef.current.src = "";
        videoRef.current.load();
        if (mediaRecorder && mediaRecorder.state !== "recording") {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
          });
          videoRef.current.srcObject = stream;
        }
      }
    };

    resetVideo();
  }, [currentQuestionIndex]);

  useEffect(() => {
    initMediaRecorder();
    return () => {
      console.log("media recorder state", mediaRecorder?.state);
    };
  }, [mediaRecorder, currentQuestionIndex]);

  useEffect(() => {
    if (mediaRecorder) {
      const chunks: Blob[] = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      mediaRecorder.onstart = (event) => {
        chunks.length = 0;
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm" });
        onRecordingComplete(blob);
        console.log("Updating");
        if (videoRef.current) {
          videoRef.current.srcObject = null;
          videoRef.current.src = URL.createObjectURL(blob);
        }
      };
    }
  }, [mediaRecorder, onRecordingComplete, currentQuestionIndex]);

  useEffect(() => {
    if (reset) {
      setAttempts(0);
      if (videoRef.current) {
        videoRef.current.src = "";
        videoRef.current.load();
      }
    }
  }, [reset]);

  const handleStartRecording = async () => {
    if (
      mediaRecorder &&
      mediaRecorder.state !== "recording" &&
      attempts < maxAttempts
    ) {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setAttempts(attempts + 1);
      mediaRecorder.start();
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
  };

  return (
    <Box textAlign="center">
      <video
        ref={videoRef}
        width="50%"
        autoPlay
        muted
        controls={mediaRecorder?.state === "inactive"}
      />
      <div>Status: {mediaRecorder?.state}</div>
      <Typography variant="body1">
        Attempt {attempts} of {maxAttempts}
      </Typography>
      <Box mt={2}>
        <Button
          variant="contained"
          color="error"
          onClick={handleStartRecording}
          disabled={
            mediaRecorder?.state === "recording" || attempts >= maxAttempts
          }
          endIcon={<RadioButtonChecked />}
        >
          Record
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={handleStopRecording}
          disabled={mediaRecorder?.state !== "recording"}
          style={{ marginLeft: "1rem" }}
          endIcon={<StopCircle />}
        >
          Stop
        </Button>
      </Box>
    </Box>
  );
};

export default VideoRecorder;
