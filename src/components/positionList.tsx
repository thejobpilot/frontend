import { useState } from 'react';
import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemText,
} from '@mui/material';

function PositionList() {
    const [selectedInterview, setSelectedInterview] = useState(null);
    const [showPositions, setShowPositions] = useState(false);

    const interviews = [
        { id: 1, title: 'Position 1', positions: ['Interview 1', 'Interview 2'] },
        { id: 2, title: 'Position 2', positions: ['Interview 3', 'Interview 4'] },
        { id: 3, title: 'Position 3', positions: ['Interview 5', 'Interview 6'] },
        { id: 4, title: 'Position 4', positions: ['Interview 7', 'Interview 8'] },
    ];

    const handleInterviewClick = (interview: any) => {
        setSelectedInterview(interview);
        setShowPositions(true);
    };

    const handleBackClick = () => {
        setSelectedInterview(null);
        setShowPositions(false);
    };

    // @ts-ignore
    // @ts-ignore
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
                width: '30%',
            }}
        >
            <Typography
                variant="h5"
                sx={{ bgcolor: '#111E31', color: 'white', p: 2, textAlign: 'center' }}
            >
                {showPositions ? (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography
                            variant="h5"
                            sx={{ mr: 2, cursor: 'pointer' }}
                            onClick={handleBackClick}
                        >
                            {'<'}
                        </Typography>
                        <Typography variant="h5">{selectedInterview.title}</Typography>
                    </Box>
                ) : (
                    'Positions'
                )}
            </Typography>
            <List>
                {showPositions
                    ? selectedInterview?.positions.map((position) => (
                        <ListItem
                            key={position}
                            button
                            sx={{ borderBottom: '1px solid #E0E0E0' }}
                        >
                            <ListItemText primary={position} />
                        </ListItem>
                    ))
                    : interviews.map((interview) => (
                        <ListItem
                            key={interview.id}
                            button
                            onClick={() => handleInterviewClick(interview)}
                            sx={{ borderBottom: '1px solid #E0E0E0' }}
                        >
                            <ListItemText primary={interview.title} />
                        </ListItem>
                    ))}
            </List>
        </Box>
    );
}
export default PositionList;
