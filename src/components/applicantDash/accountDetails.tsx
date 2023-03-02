import { Box, Typography, TextField, Button, FormGroup, Checkbox, FormControlLabel } from '@mui/material';
import { useEffect, useState } from 'react';

import useUser from '../dbHooks/useUser';
// import updateDetails from './updateDetails';
import { User, UserUserTypeEnum } from 'gen/api';
import { UserProfile } from '@auth0/nextjs-auth0/client';


function AccountDetails(props: { user: UserProfile; }) {
    const [details, setDetails] = useState<User>({
      username: "",
      email: props.user.email as string,
      fullName: "",
      graduationDate: "",
      gpa: 0,
      resumeLink: "",
      userType: UserUserTypeEnum.Applicant,
      retakes: true,
    });

    const { data, isLoading, isError, mutate } = useUser(props.user.email!);

    function formHandler(e: { target: { name: any; value: any } }) {
      const { name, value } = e.target;
      console.log(e.target.value);
      //   setDetails((prev) => {
      //     return { ...prev, [name]: value };
      //   });
    }


    // const onSubmit = async (event: any) => {
    //     event.preventDefault();
    //     console.log("hi")
    //     const { data: newData } = await updateDetails(props.user.email, details);

    // }

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
            <Typography variant="h5" sx={{ mb: 2, bgcolor: '#111E31', color: 'white', p: 2, textAlign: 'center' }}>
                Account details
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                    id="outlined-username"
                    label="Username"
                    variant="outlined"
                    name="username"
                    defaultValue={data.username}
                    onChange={(e) => formHandler(e)}
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
                    onChange={(e) => formHandler(e)}
                />
                <TextField
                    id="outlined-graduation-date"
                    label="Graduation date"
                    variant="outlined"
                    name="graduationDate"
                    defaultValue={data.graduationDate}
                    onChange={(e) => formHandler(e)}
                />
                <TextField
                    id="outlined-gpa"
                    label="GPA"
                    variant="outlined"
                    name="gpa"
                    defaultValue={data.gpa}
                    onChange={(e) => formHandler(e)}
                />
                <TextField
                    id="outlined-resume-link"
                    label="Resume link"
                    variant="outlined"
                    name="resumeLink"
                    defaultValue={data.resumeLink}
                    onChange={(e) => formHandler(e)}
                />
                <Typography>Set Preferred Industry</Typography>
                <FormGroup>
                    <FormControlLabel control={<Checkbox />} label="Tech" />
                    <FormControlLabel control={<Checkbox />} label="Agriculture" />
                    <FormControlLabel control={<Checkbox />} label="Healthcare" />
                    <FormControlLabel control={<Checkbox />} label="BioPharm" />
                    <FormControlLabel control={<Checkbox />} label="Finance" />
                    <FormControlLabel control={<Checkbox />} label="Consumer" />
                </FormGroup>
                <Button variant="contained" sx={{ bgcolor: '#111E31', color: 'white' }}>
                    Save
                </Button>
            </Box>
        </Box>
    );
}

export default AccountDetails;
