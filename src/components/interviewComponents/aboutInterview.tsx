import React from 'react';
import {Box, Typography} from '@mui/material';

const InterviewBox = (props: {position: any, about: any, type: any}) => {
    return (
        <Box
            sx={{
                backgroundColor: 'white',
                color: 'black',
                position: 'fixed',
                top: '80px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '70%',
                height: '20%',
                overflow: 'auto',
            }}
        >
            <Box
                sx={{
                    backgroundColor: '#111E31',
                    color: 'white',
                    padding: '10px',
                }}
            >
                <Typography variant="h4">{props.position}</Typography>
                <Typography variant="body1">{props.type} Interview</Typography>
            </Box>
            <Box sx={{padding: '20px'}}>
                <Typography variant="body2">{props.about}</Typography>
            </Box>
        </Box>
    );
};

export default InterviewBox;
