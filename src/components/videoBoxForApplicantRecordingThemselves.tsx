import React, { useRef, useState } from 'react';

const VideoRecorder = () => {
    const videoRef = useRef(null);
    const [recording, setRecording] = useState(false);
    const [videoURL, setVideoURL] = useState('');

    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        // @ts-ignore
        videoRef.current.srcObject = stream;
        // @ts-ignore
        videoRef.current.play();

        const mediaRecorder = new MediaRecorder(stream);
        const chunks: BlobPart[] | undefined = [];

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
        // @ts-ignore
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
        // @ts-ignore
        videoRef.current.srcObject = null;
    };

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
                <video src={videoURL} controls width="360" height="240" />
            ) : (
                <div style={{
                    width: '360px',
                    height: '240px',
                    border: '1px solid black',
                }}>
                    <video ref={videoRef} width="360" height="240" style={{ display: 'none' }} />
                </div>
            )}
            <div style={{ marginTop: '10px' }}>
                {recording ? (
                    <button onClick={stopRecording}>Stop Recording</button>
                ) : (
                    <button onClick={startRecording}>Start Recording</button>
                )}
            </div>
        </div>
    );
};

export default VideoRecorder;
