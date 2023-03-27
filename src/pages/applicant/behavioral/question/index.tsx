
// InterviewPage.tsx
import React, { useState } from 'react';
import CameraComponent from '@/components/behavioralInterview/recorder';
import QuestionComponent from "@/components/behavioralInterview/questionComponent";
import ProgressBar from '@/components/behavioralInterview/progressBar';
import Controls from '@/components/behavioralInterview/controls';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const InterviewPage: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const totalQuestions = 3;
  const prompt =
    'Tell us about the education, and work experiences that have helped prepare you for this position.';

  const onStartRecording = () => {
    console.log('Recording started');
  };

  const onStopRecording = () => {
    console.log('Recording stopped');
  };

  const onSubmit = () => {
    console.log('Interview submitted');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CameraComponent />
      <QuestionComponent
        currentQuestion={currentQuestion}
        totalQuestions={totalQuestions}
        prompt={prompt}
      />
      <Box sx={{ width: '100%', maxWidth: 600, mt: 2 }}>
        <ProgressBar currentStep={currentQuestion} totalSteps={totalQuestions} />
      </Box>
      <Box sx={{ mt: 2 }}>
        <Controls
          onStartRecording={onStartRecording}
          onStopRecording={onStopRecording}
          onSubmit={onSubmit}
        />
      </Box>
    </Box>
  );
};

export default InterviewPage;

