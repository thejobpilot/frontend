import * as React from 'react';

import {Inter} from '@next/font/google'
import ResponsiveAppBar from "@/components/navBar";
import Question from "@/components/interviewQuestion";
import Grid from '@mui/material/Grid';
const inter = Inter({subsets: ['latin']})

export default function questiontemplate() {
    
  return (
    <>
    <ResponsiveAppBar></ResponsiveAppBar>
    <Grid container 
    spacing={1} 
    rowSpacing={10}
    alignItems="center"
    
    > 
    
    <Grid item xs={12}> <Question num="1"></Question> </Grid>
    <Grid item xs={12}> <Question num="2"></Question> </Grid>
    <Grid item xs={12}> <Question num="3"></Question> </Grid>
  
    </Grid>


    </>
  );
}
