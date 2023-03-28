import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { VerticalAlignBottom } from '@mui/icons-material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { blueGrey } from '@mui/material/colors';


export default function interviewDash() {

    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Box sx={{ 
        // background: "green",
        width: "90%",
        height: "70%",
        display: 'flex',
        flexDirection: "column",
        alignItems: "center",
        mt: 5, 
       
      }}>
         <Grid container spacing={1}>
          <Grid xs={12}>
          {/* change font */}
          <Typography variant='h2' sx={{ 
            alignSelf: 'flex-start', 
            textAlign: "center" }}> 
            Hello, insert name</Typography>
          </Grid>

          <Grid xs={12}>
            <Typography variant='h5' sx={{ 
              alignSelf: 'flex-start', 
              textAlign: "center" }}> 
            Welcome to the next step for your interview process w/ (Company)!
             <br /> <br />This interview is for position (swe) and there will be (x) questions.
             Each question will have (mm) prep time, (mm) response time, and there will be (x)
             retakes for each question. The estimated time to complete this interview is (x).
            <br />
           </Typography>
          </Grid>
          <Grid xs={12}>
            <Typography variant='h6' sx={{ 
              alignSelf: 'flex-start', 
              textAlign: "center" }}> <br />
            Each question will have the promp and the question number on the left side of the page. The top left will show the question you are on
            and how many questions total there are. The prompt will be below the question number in text form. If applicable it can also be shown
            through a video on the left hand side as well. On the right hand side you will have a count down. The count down can represent the 
            prep time if applicable. Prep time is the time that is given for you before you answer the prompt to brainstorm an answer. After the prep
            time then you will proceed to record your submission for the interview which will have a response time count down. The response time 
            represents how long you have to answer the prompt. If applicable after a submission you may have the option to retake a submission which 
            will override your previous submission. On the right hand side there will either be a video of your camera showing what is being
            recorded and what will be submitted. Otherwise it will be a textbox where you can type out your question. Best of luck!

             <br /> <br /> To get started we need a front-facing camera and microphone. </Typography>
          </Grid>

          <Grid xs={12}>
            <Stack spacing={2} direction="row" alignItems="flex-end" justifyContent="center" sx={{mt: 5}}>
         
              <Button href="/applicant/behavioral/question" variant="contained" sx={{ width: '25%' }}>Continue </Button>
            </Stack>
          </Grid>
      </Grid>

      </Box>
    </div>


    );
}