import React, { useRef, useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';

interface VideoDisplayProps {
    src?: string;
}

const VideoDisplay: React.FC<VideoDisplayProps> = ({ src = "https://i.geckolib.com/file/softwarelocker/05h1Cg.mp4" }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [videoURL, setVideoURL] = useState<string>(src || '');

    return (
        <Box
            component={Paper}
            sx={{
                position: 'fixed',
                bottom: '250px',
                left: '400px',
                width: 400,
                height: 300,
                margin: 2,
                padding: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {videoURL ? (
                <video src={videoURL} controls width="720" height="480" ref={videoRef} />
            ) : (
                <Typography variant="h6" color="text.secondary">No video available</Typography>
            )}
        </Box>
    );
};

export default VideoDisplay;
