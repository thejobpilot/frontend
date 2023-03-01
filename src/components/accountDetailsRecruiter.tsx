import * as React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

function AccountDetailsRecruiter() {
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [graduationDate, setGraduationDate] = React.useState('');
    const [gpa, setGpa] = React.useState('');
    const [resumeLink, setResumeLink] = React.useState('');

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
                    id="outlined-first-name"
                    label="First name"
                    variant="outlined"
                    value={firstName}
                    onChange={(event) => {
                        setFirstName(event.target.value);
                    }}
                />
                <TextField
                    id="outlined-last-name"
                    label="Last name"
                    variant="outlined"
                    value={lastName}
                    onChange={(event) => {
                        setLastName(event.target.value);
                    }}
                />
                <TextField
                    id="outlined-graduation-date"
                    label="Company"
                    variant="outlined"
                    value={graduationDate}
                    onChange={(event) => {
                        setGraduationDate(event.target.value);
                    }}
                />
                <Button variant="contained" sx={{ bgcolor: '#111E31', color: 'white' }}>
                    Save
                </Button>
            </Box>
        </Box>
    );
}

export default AccountDetailsRecruiter;
