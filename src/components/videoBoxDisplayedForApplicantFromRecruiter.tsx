import React, { useRef, useState } from 'react';

const VideoDisplay = ({ src }) => {
    const videoRef = useRef(null);
    const [videoURL, setVideoURL] = useState(src || '');

    return (
        <div style={{
            position: 'fixed',
            bottom: '20px',
            left: '20px',
            width: '400px',
            height: '300px',
            margin: '20px',
            backgroundColor: '#EFEFEF',
            padding: '10px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            {videoURL ? (
                <video src={videoURL} controls width="360" height="240" ref={videoRef} />
            ) : (
                <div>No video available</div>
            )}
        </div>
    );
};

export default VideoDisplay;
