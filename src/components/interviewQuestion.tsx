import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { spacing } from '@mui/system';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs, { Dayjs } from 'dayjs';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';



export default function QuestionContainter() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="md">
        
      <Box 
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '50ch' },
        height: '35vh',
        mt: 10,
        bgcolor: '#cfe8fc'

      }}
      noValidate
      autoComplete="off"
      > 
        <Typography variant="h3">Question X</Typography>

        <TextField
          required
          id="prompt"
          label="Insert Question Prompt Here"
        
          multiline
          fullWidth
          margin="normal"
          variant="outlined"
        />

        <TextField
          required
          id="time"
          label="Time Alloted: mm:ss"
          fullWidth
          margin="normal"
          variant="outlined"
        />

        {/* should i add a switch? */}
        
        <TextField
          required
          id="retrys"
          label="Number of retrys allotted"
          fullWidth
          margin="normal"
          variant="outlined"
        />

      
        

      </Box> 
        
      </Container>
    </React.Fragment>
    

    
  );
}
