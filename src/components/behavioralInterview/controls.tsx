// Controls.tsx
import React from 'react';
import Button from '@mui/material/Button';

interface ControlsProps {
  onStartRecording: () => void;
  onStopRecording: () => void;
  onSubmit: () => void;
}

const controls: React.FC<ControlsProps> = ({
  onStartRecording,
  onStopRecording,
  onSubmit,
}) => {
  return (
    <div>
  
      <Button variant="contained" onClick={onSubmit}>
        Submit
      </Button>
    </div>
  );
};

export default controls;
