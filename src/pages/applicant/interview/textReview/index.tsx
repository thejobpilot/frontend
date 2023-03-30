import VideoPlayer from '@/components/behavioralInterview/videoPlayer';
import Countdown from '@/components/behavioralInterview/countdown';
import React, { useState } from 'react';
import CameraComponent from '@/components/behavioralInterview/recorder';
import QuestionComponent from "@/components/behavioralInterview/questionComponent";
import ProgressBar from '@/components/behavioralInterview/progressBar';
import Controls from '@/components/behavioralInterview/controls';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ResponsiveAppBar from "@/components/navBar";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';


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
    const videoLink = 'https://i.geckolib.com/file/softwarelocker/05h1Cg.mp4';
    const numRetrys = 2;
    const valueToCompare: number = 0;
    const totalQuestions = 3;
    const [progress, setProgress] = useState(0);
    const prompt =
      'Tell us about the education, and work experiences that have helped prepare you for this position.';
    const countdownSeconds = 120;
    const [textValue, setTextValue] = useState('');
  
    const onStartRecording = () => {
      console.log('Recording started');
    };
  
    const onStopRecording = () => {
      console.log('Recording stopped');
    };
  
    const onSubmit = () => {
      console.log('Interview submitted');
    };
    const handleCountdownUpdate = (progress: number) => {
      setProgress(progress);
    };
    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTextValue(event.target.value);
      };
  
    return (
      <ThemeProvider theme={theme}>
        <ResponsiveAppBar></ResponsiveAppBar>
        <Box sx={{ flexGrow: 1, mt: 8, p: 2 }}>
          <Grid container spacing={4} alignItems="stretch">
            <Grid item xs={12} sm={6}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  p: 2,
                  backgroundColor: '#fff',
                  borderRadius: 2,
                  boxShadow: 1,
                  minHeight: 300,
                  height: '100%',
                }}
              >
                <QuestionComponent
                  currentQuestion={currentQuestion}
                  totalQuestions={totalQuestions}
                  prompt={prompt}
                />
                {/* <Box sx={{ mt: 2, width: '100%' }}>
                  <ProgressBar currentStep={currentQuestion} totalSteps={totalQuestions} />
                </Box> */}
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
                <Box sx={{ mt: 2 }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography variant="h4">Review</Typography>
                    <Typography variant="body1">{`(${numRetrys} retries left)`}</Typography>
                 </Stack>
                {/* <Countdown seconds={countdownSeconds} onCountdownUpdate={handleCountdownUpdate} /> */}
                </Box>
                <Box sx={{ mt: 2, width: '100%' }}>
                {/* <ProgressBar currentStep={progress} totalSteps={100} /> */}
                </Box>
                <Box sx={{ mt: 2 }}>
                <TextField
                    multiline
                    minRows={5}
                    placeholder="Enter your answer here"
                    variant="outlined"
                    fullWidth
                    value={textValue}
                    onChange={handleTextChange}
                  />
                </Box>
                <Box sx={{ mt: 2 }}>
                <Stack direction="row" alignItems="center" sx={{ mt: 2 }}>
                <Button
                    variant="outlined"
                    disabled={numRetrys === valueToCompare}
                    onClick={() => console.log('Retry clicked')}
                    sx={{ marginRight: 1 }}
                >
                    Retry
                </Button>
                <Controls
                    onStartRecording={onStartRecording}
                    onStopRecording={onStopRecording}
                    onSubmit={onSubmit}
                />
                </Stack>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </ThemeProvider>
    );
  };
  
  export default InterviewPage;