// ProgressBar.tsx
import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const progressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return <LinearProgress variant="determinate" value={progressPercentage} />;
};

export default progressBar;
