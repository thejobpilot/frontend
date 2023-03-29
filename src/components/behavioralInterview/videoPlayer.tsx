// VideoPlayer.tsx
import React from 'react';
import Box from '@mui/material/Box';

interface VideoPlayerProps {
  src: string;
}

const videoPlayer: React.FC<VideoPlayerProps> = ({ src }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        borderRadius: 2,
        boxShadow: 1,
        overflow: 'hidden',
      }}
    >
      <video
        width="100%"
        controls
        src={src}
        style={{
          objectFit: 'contain',
        }}
      />
    </Box>
  );
};

export default videoPlayer;
