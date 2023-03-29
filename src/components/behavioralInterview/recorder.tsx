import React, { useEffect, useRef } from 'react';

const CameraComponent = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const getUserMedia = async () => {
      try {
        const constraints = { video: true };
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('Error accessing camera:', err);
      }
    };

    getUserMedia();
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const mediaStream: MediaStream = videoRef.current.srcObject as MediaStream;
        mediaStream.getTracks().forEach((track: MediaStreamTrack) => track.stop());
      }
    };
  }, []);

  return <video ref={videoRef} autoPlay playsInline />;
};

export default CameraComponent;
