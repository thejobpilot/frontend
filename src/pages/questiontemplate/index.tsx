import * as React from 'react';

import {Inter} from '@next/font/google'
import ResponsiveAppBar from "@/components/navBar";
import Question from "@/components/interviewQuestion";
import Grid from '@mui/material/Grid';
import { margin } from '@mui/system';
import { Box, Button, Typography } from '@mui/material';
const inter = Inter({subsets: ['latin']})

export default function questiontemplate() {
  const divStyle = {
    marginTop: '77px',
    justifyContent: 'center',
    alignItems: 'center'
  };

  const buttonStyle = {
    marginTop: '50px',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '150px'
  };

  return (
    <>
    <ResponsiveAppBar></ResponsiveAppBar>
    
   
    <div style={divStyle}>
    <Typography variant="h2" align="center" > Quiz Creation Page </Typography>
      <Grid container 
      spacing={1} 
      rowSpacing={10}
      alignItems="center"
    > 
      <Grid item xs={12}> <Question num="1"></Question> </Grid>
      <Grid item xs={12}> <Question num="2"></Question> </Grid>
      <Grid item xs={12}> <Question num="3"></Question> </Grid>

      </Grid>
    </div>

    <div style={buttonStyle}>
    <Box textAlign='center'>
      <Button variant="contained" size="large">
            Save Template
        </Button>

    </Box>
    </div>

    </>
  );
}
