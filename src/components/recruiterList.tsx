import { useState } from 'react';
import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemText,
} from '@mui/material';

function InterviewList() {
    const [selectedInterview, setSelectedInterview] = useState(null);

    const interviews = [
        { id: 1, title: 'Recruiter 1' },
        { id: 2, title: 'Recruiter 2' },
        { id: 3, title: 'Recruiter 3' },
        { id: 4, title: 'Recruiter 4' },
    ];

    const handleInterviewClick = (interview: any) => {
        setSelectedInterview(interview);
    };

    return (
        <Box
            sx={{
                p: 3,
                bgcolor: 'white',
                color: 'black',
                position: 'absolute',
                top: 55,
                left: 0,
                height: '100%',
                width: '40%', // Set the width to 70% of the available space
            }}
        >
            <Typography
                variant="h5"
                sx={{ bgcolor: '#111E31', color: 'white', p: 2, textAlign: 'center' }}
            >
                Recruiters
            </Typography>
            <List>
                {interviews.map((interview) => (
                    <ListItem
                        key={interview.id}
                        button
                        onClick={() => handleInterviewClick(interview)}
                        sx={{
                            borderBottom: '1px solid #E0E0E0',
                        }}
                    >
                        <ListItemText primary={interview.title} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}

export default InterviewList;
