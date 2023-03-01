import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { spacing } from '@mui/system';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';



export default function QuestionContainter(props: { num: any; }) {
  const { num } = props;
  const divStyle = {
    justifyContent: 'center',
    alignItems: 'center'
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="md">
        
      {/* <Box 
      component="form"
      sx={{
        //'& > :not(style)': { m: 1, width: '50ch' },
        width: '100ch',
        height: '50vh',
        mt: 10,
        bgcolor: '#cfe8fc'

      }}
      noValidate
      autoComplete="off"
      >  */}
       <div style={divStyle}>
        <Typography variant="h3">Question {num} </Typography>
      </div>
        
      <div style={divStyle}>
        

        <Grid container direction="row" alignItems="center" spacing={3} justifyContent="center">
          <Grid item>
            <Typography variant="h4">Prompt:</Typography> 
          </Grid>
          <Grid item>
            <TextField
            required
            id="prompt"
            label="Enter Text Here"
            style = {{width: 400}}
            margin="normal"
            variant="outlined"
          />
          </Grid>
        </Grid>
        
        </div>
        
        <div style={divStyle}>
        
        {/* should i add a switch? */}
        <Grid container direction="row" alignItems="center" spacing={3} justifyContent="center">
          <Grid item>
            <Typography variant="h4">Prep Time:</Typography> 
          </Grid>
          <Grid item>
            <TextField
            required
            id="time"
            label="mm:ss"
            style = {{width: 355}}
            margin="normal"
            variant="outlined"
          />
          </Grid>
        </Grid>
        </div>

        <div>
        <Grid container direction="row" alignItems="center" spacing={3} justifyContent="center">
          <Grid item>
            <Typography variant="h4">Answer Time:</Typography> 
          </Grid>
          <Grid item>
            <TextField
            required
            id="time"
            label="mm:ss"
            style = {{width: 314}}
            margin="normal"
            variant="outlined"
          />
          </Grid>
        </Grid>
        </div>

        <div>
        {/* should i add a switch? */}
        <Grid container direction="row" alignItems="center" spacing={3} justifyContent="center">
          <Grid item>
            <Typography variant="h4">Retrys Allowed:</Typography> 
          </Grid>
          <Grid item>
            <FormControl 
              sx= {{
                width: 286,
              }}>
                <InputLabel id="retrysinput">Retrys</InputLabel>
                <Select
                  labelId="retrys"
                  id="demo-simple-select"
                  // value={age}
                  label="Retrys"
                  // onChange={handleChange}
                >
                  <MenuItem value={0}>0</MenuItem>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>Infinite</MenuItem>
                </Select>
              </FormControl>
          </Grid>
        </Grid>
        </div>
        
  
      
        

      {/* </Box>  */}
        
      </Container>
    </React.Fragment>
    

    
  );
}
