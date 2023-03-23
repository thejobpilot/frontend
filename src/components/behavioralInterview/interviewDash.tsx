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

export default function interviewDash() {

    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Box sx={{ 
       
        width: "45%",
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
            <Typography variant='h4' sx={{ 
              alignSelf: 'flex-start', 
              textAlign: "center" }}> 
            Welcome to the next step for your interview process w/ (Company)!
             <br /> <br />This interview is for position (swe) and there will be (x) questions.
             Each question will have (mm) prep time, (mm) response time, and there will be (x)
             retakes for each question. The estimated time to complete this interview is (x).

             <br /> <br /> To get started we need a front-facing camera and microphone. </Typography>
          </Grid>
          <Grid xs={12}>
            <Stack spacing={2} direction="row" alignItems="flex-end" justifyContent="center" sx={{mt: 5}}>
              <Button variant="contained" sx={{ width: '25%' }}>See how it works </Button>
               
              <Button variant="contained" sx={{ width: '25%' }}>Continue </Button>
            </Stack>
          </Grid>
      </Grid>

      </Box>
    </div>


    );
}