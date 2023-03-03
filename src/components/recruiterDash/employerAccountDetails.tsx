import * as React from 'react';
import { Box, Typography, TextField, Button, FormGroup, FormControlLabel, Checkbox } from '@mui/material';

export function EmployerAccountDetails() {
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [company, setCompany] = React.useState('');
    const [password, setPassword] = React.useState('');
    

    const handleSave = () => {
        // Handle saving account details here
    };

    return (
        <Box
            sx={{
                p: 3,
                bgcolor: 'white',
                color: 'black',
                position: 'absolute',
                top: 55,
                right: 0,
                height: '100%',
                width: '60%', // Set the width to 70% of the available space
            }}
        >
            <Typography variant="h5" sx={{ mb: 2, bgcolor: '#111E31', color: 'white', p: 2, textAlign: 'center' }}>
                Account details
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                    id="outlined-username"
                    label="Username"
                    variant="outlined"
                    value={username}
                    onChange={(event) => {
                        setUsername(event.target.value);
                    }}
                />
                <TextField
                    id="outlined-email"
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={(event) => {
                        setEmail(event.target.value);
                    }}
                />
                <TextField
                    id="outlined-company-name"
                    label="Company Name"
                    variant="outlined"
                    value={company}
                    onChange={(event) => {
                        setCompany(event.target.value);
                    }}
                />
                <TextField
                    id="outlined-password"
                    label="Password"
                    variant="outlined"
                    value={password}
                    onChange={(event) => {
                        setPassword(event.target.value);
                    }}
                />
          
                <FormGroup>
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
                    <FormControlLabel disabled control={<Checkbox />} label="Disabled" />
                </FormGroup>
                
                <Button variant="contained" sx={{ bgcolor: '#111E31', color: 'white' }}>
                    Save
                </Button>
            </Box>
        </Box>
    );
}

