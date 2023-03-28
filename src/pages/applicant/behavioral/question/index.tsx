
// InterviewPage.tsx
import React, { useState } from 'react';
import CameraComponent from '@/components/behavioralInterview/recorder';
import QuestionComponent from "@/components/behavioralInterview/questionComponent";
import ProgressBar from '@/components/behavioralInterview/progressBar';
import Controls from '@/components/behavioralInterview/controls';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Countdown from '@/components/behavioralInterview/countdown';
import Grid from '@mui/material/Grid';
import ResponsiveAppBar from "@/components/navBar";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6200ee',
    },
    secondary: {
      main: '#03dac6',
    },
  },
});

const InterviewPage: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const totalQuestions = 3;
  const prompt =
    'Tell us about the education, and work experiences that have helped prepare you for this position.';
  const countdownSeconds = 120;

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

    <ThemeProvider theme={theme}>
    <ResponsiveAppBar></ResponsiveAppBar>
      <Box sx={{ flexGrow: 1, mt: 2, p: 2 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                p: 2,
                backgroundColor: '#fff',
                borderRadius: 2,
                boxShadow: 1,
                minHeight: 300,
              }}
            >
              <QuestionComponent
                currentQuestion={currentQuestion}
                totalQuestions={totalQuestions}
                prompt={prompt}
              />
              <Box sx={{ mt: 2 }}>
                <Countdown seconds={countdownSeconds} />
              </Box>
              <Box sx={{ mt: 2, width: '100%' }}>
                <ProgressBar currentStep={currentQuestion} totalSteps={totalQuestions} />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                p: 2,
                backgroundColor: '#fff',
                borderRadius: 2,
                boxShadow: 1,
                minHeight: 300,
              }}
            >
              <CameraComponent />
              <Box sx={{ mt: 2 }}>
                <Controls
                  onStartRecording={onStartRecording}
                  onStopRecording={onStopRecording}
                  onSubmit={onSubmit}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default InterviewPage;