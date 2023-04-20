import React, { useRef, useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';

interface VideoRecorderProps {
    onRecordingComplete: (blob: Blob) => void;
    reset: boolean;
    currentQuestionIndex: number;
}

const VideoRecorder: React.FC<VideoRecorderProps> = ({ onRecordingComplete, reset, currentQuestionIndex }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
    const [status, setStatus] = useState<'idle' | 'recording' | 'stopped'>('idle');
    const [attempts, setAttempts] = useState(0);
    const maxAttempts = 3;

    useState(currentQuestionIndex);

    useEffect(() => {
        const resetVideo = async () => {
            if (videoRef.current) {
                setAttempts(0);
                videoRef.current.src = '';
                videoRef.current.load();
                if (mediaRecorder && status !== 'recording') {
                    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                    videoRef.current.srcObject = stream;
                }
            }
        };

        resetVideo();
        return () => mediaRecorder?.stop()
    }, [currentQuestionIndex]);


    useEffect(() => {
        const initMediaRecorder = async () => {
            if (videoRef.current && !mediaRecorder) {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                videoRef.current.srcObject = stream;

                const recorder = new MediaRecorder(stream);
                setMediaRecorder(recorder);
            }
        };

        initMediaRecorder();
        return () => mediaRecorder?.stop()
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
            }

            mediaRecorder.onstop = () => {
                const blob = new Blob(chunks, { type: 'video/webm' });
                onRecordingComplete(blob);
                console.log("Updating")
                if (videoRef.current) {
                    videoRef.current.srcObject = null;
                    videoRef.current.src = URL.createObjectURL(blob);
                }
            };
        }
        return () => mediaRecorder?.stop()
    }, [mediaRecorder, onRecordingComplete, currentQuestionIndex]);

    useEffect(() => {
        if (reset) {
            setStatus('idle');
            setAttempts(0);
            if (videoRef.current) {
                videoRef.current.src = '';
                videoRef.current.load();
            }
        }
        return () => mediaRecorder?.stop()
    }, [reset]);

    const handleStartRecording = async () => {
        if (mediaRecorder && status !== 'recording' && attempts < maxAttempts) {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if(videoRef.current) {
                videoRef.current.srcObject = stream;
            }
            setStatus('recording');
            setAttempts(attempts + 1);
            mediaRecorder.start();
        }
    };

    const handleStopRecording = () => {
        if (mediaRecorder && status === 'recording') {
            mediaRecorder.stop();
            setStatus('stopped');
        }
    };

    return (
        <Box textAlign="center">
            <video ref={videoRef} width="50%" autoPlay muted controls />
            <div>Status: {status}</div>
            <Typography variant="body1">
                Attempt {attempts} of {maxAttempts}
            </Typography>
            <Box mt={2}>
                <Button
                    variant="contained"
                    onClick={handleStartRecording}
                    disabled={status === 'recording' || attempts >= maxAttempts}
                >
                    Record
                </Button>
                <Button
                    variant="contained"
                    onClick={handleStopRecording}
                    disabled={status !== 'recording'}
                    style={{ marginLeft: '1rem' }}
                >
                    Stop
                </Button>
            </Box>
        </Box>
    );
};

export default VideoRecorder;
