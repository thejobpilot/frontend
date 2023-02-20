import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { spacing } from '@mui/system';



export default function QuestionContainter() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="md">
      <Box sx={{ bgcolor: '#cfe8fc', height: '35vh', mt: 10 }}> 
        <Typography variant="h1">Lizard</Typography>
      </Box> 
        
      </Container>
    </React.Fragment>
    

    
  );
}
