import React, { useState } from 'react';
import Permissions from "@/components/interviewComponents/permissions";
import ResponsiveAppBar from "@/components/navBar";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/router";


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
  
  const PermissionsPage: React.FC = () => {
    const router = useRouter();

    const { id } = router.query;
    

    const [currentQuestion, setCurrentQuestion] = useState(1);
    const totalQuestions = 3;
    const [progress, setProgress] = useState(0);
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
    const handleCountdownUpdate = (progress: number) => {
      setProgress(progress);
    };
  
    return (
      <ThemeProvider theme={theme}>
        <ResponsiveAppBar></ResponsiveAppBar>
        <Permissions id={id}></Permissions>
      </ThemeProvider>
    );
  };
  
  export default PermissionsPage;