import { Box, Typography, TextField, Button, FormGroup, Checkbox, FormControlLabel } from '@mui/material';
import { useEffect, useState } from 'react';

import useUserDB from '../db/useUserDB';
import requestSetUser from '../db/requestSetUser';
import { User, UserUserTypeEnum } from 'jobpilot-backend';
import { UserProfile } from '@auth0/nextjs-auth0/client';

function AccountDetails(props: { user: UserProfile; }) {
    const [details, setDetails] = useState<User>({
      username: props.user.email as string,
      email: props.user.email as string,
      fullName: "",
      graduationDate: "",
      gpa: 0,
      resumeLink: "",
      userType: UserUserTypeEnum.Applicant,
      retakes: true,
      jobPreference: "",
      rolePreference: "",
      locationPreference: ""
    });

    const { data, isLoading, isError, mutate } = useUserDB(props.user.email!);

    useEffect(() => {
        if (data) setDetails(data as User);
    }, [data])

    const handleSubmit = (e: any) => {
      e.preventDefault();
      requestSetUser(details.email, details)
      mutate(details);
    };

    function updateField(e: any) {
      const { name, value } = e.target;
      setDetails((prev) => {
        return { ...prev, [name]: value };
      });
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    if (isError) return <div>failed to load</div>;
    if (isLoading) return <div>loading...</div>;
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
            <Typography variant="h5" sx={{mb: 2, bgcolor: '#111E31', color: 'white', p: 2, textAlign: 'center'}}>
                Account details ({capitalizeFirstLetter(data.userType)})
            </Typography>
            <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
                <TextField
                    id="outlined-username"
                    label="Username"
                    variant="outlined"
                    name="username"
                    defaultValue={data.username}
                    onChange={(e) => updateField(e)}
                />
                <TextField
                    id="outlined-email"
                    label="Email"
                    variant="outlined"
                    defaultValue={data.email}
                    disabled
                />
                <TextField
                    id="outlined-first-name"
                    label="Full name"
                    name="fullName"
                    variant="outlined"
                    defaultValue={data.fullName}
                    onChange={(e) => updateField(e)}
                />
                <TextField
                    id="outlined-graduation-date"
                    label="Graduation date"
                    variant="outlined"
                    name="graduationDate"
                    defaultValue={data.graduationDate}
                    onChange={(e) => updateField(e)}
                />
                <TextField
                    id="outlined-gpa"
                    label="GPA"
                    variant="outlined"
                    name="gpa"
                    defaultValue={data.gpa}
                    onChange={(e) => updateField(e)}
                />
                <TextField
                    id="outlined-resume-link"
                    label="Resume link"
                    variant="outlined"
                    name="resumeLink"
                    defaultValue={data.resumeLink}
                    onChange={(e) => updateField(e)}
                />
                <TextField
                    id="outlined-job-preference"
                    label="Job preference"
                    variant="outlined"
                    name="jobPreference"
                    defaultValue={data.jobPreference}
                    onChange={(e) => updateField(e)}
                />
                <TextField
                    id="outlined-location-preference"
                    label="Location preference"
                    variant="outlined"
                    name="locationPreference"
                    defaultValue={data.locationPreference}
                    onChange={(e) => updateField(e)}
                />
                <TextField
                    id="outlined-role-preference"
                    label="Role preference"
                    variant="outlined"
                    name="rolePreference"
                    defaultValue={data.rolePreference}
                    onChange={(e) => updateField(e)}
                />
                <Button onClick={(e) => handleSubmit(e)} variant="contained" sx={{bgcolor: '#111E31', color: 'white'}}>
                    Save
                </Button>
            </Box>
        </Box>
    );
}

export default AccountDetails;
