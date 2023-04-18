import React from 'react';
import { Box, Typography, Paper, Divider, TextField, Button } from '@mui/material';
import { styled } from '@mui/system';

const MainContainer = styled(Box)({
    display: 'flex',
    height: '100vh',
    background: '#111E31',
    color: 'white',
    marginTop: '60px',
});

const LeftContainer = styled(Paper)({
    flex: '1',
    margin: '1rem',
    padding: '1rem',
    background: '#111E31',
    color: 'white',
    overflowY: 'auto',
});

const RightContainer = styled(Paper)({
    flex: '1',
    margin: '1rem',
    padding: '1rem',
    background: '#111E31',
    color: 'white',
});

const IDEInput = styled(TextField)({
    background: 'white',
    color: '#111E31',
    width: '100%',
    height: '100%',
});

const SubmitButton = styled(Button)({
    marginTop: '1rem',
    background: 'white',
    color: '#111E31',
});

const CodingInterviewPage = () => {
    return (
        <MainContainer>
            <LeftContainer>
                <Typography variant="h5" gutterBottom>
                    Question Title
                </Typography>
                <Typography variant="body1">
                    Here is the description of the coding question. It should be detailed and provide all of the necessary information for the candidate to understand and solve the problem.
                </Typography>
                <Divider sx={{ marginY: '1rem' }} />
                <Typography variant="h6">Input</Typography>
                <Typography variant="body1">
                    This section describes the input format and any constraints that apply to the input.
                </Typography>
                <Typography variant="h6">Output</Typography>
                <Typography variant="body1">
                    This section describes the expected output format and any constraints that apply to the output.
                </Typography>
                <Typography variant="h6">Examples</Typography>
                <Typography variant="body1">
                    Example 1:
                    <br />
                    Input: ...
                    <br />
                    Output: ...
                </Typography>
                <Typography variant="body1">
                    Example 2:
                    <br />
                    Input: ...
                    <br />
                    Output: ...
                </Typography>
            </LeftContainer>
            <RightContainer>
                <IDEInput
                    multiline
                    rows={20}
                    variant="outlined"
                    placeholder="Type your code here..."
                />
                <SubmitButton variant="contained">Submit</SubmitButton>
            </RightContainer>
        </MainContainer>
    );
};

export default CodingInterviewPage;
