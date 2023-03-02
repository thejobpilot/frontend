
import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import Typography from '@mui/material/Typography';

export default function JobPreference() {
  return (
    <>

    
   <FormGroup>
    <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
    <FormControlLabel disabled control={<Checkbox />} label="Disabled" />
  </FormGroup>
 </>
  );
}

