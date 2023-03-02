import { useState } from 'react';
import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemText,
} from '@mui/material';
import useUserDB from '../db/useUserDB';
import { UserProfile } from '@auth0/nextjs-auth0/client';

function InterviewList(props: { user: UserProfile }) {
  const [selectedInterview, setSelectedInterview] = useState(0);

  const { data, isLoading, isError, mutate } = useUserDB(props.user.email!);

  const handleInterviewClick = (interview: any) => {
    setSelectedInterview(interview);
  };

  if (isError) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  return (
    <Box
      sx={{
        p: 3,
        bgcolor: "white",
        color: "black",
        position: "absolute",
        top: 55,
        left: 0,
        height: "100%",
        width: "40%", // Set the width to 70% of the available space
      }}
    >
      <Typography
        variant="h5"
        sx={{ bgcolor: "#111E31", color: "white", p: 2, textAlign: "center" }}
      >
        Interviews
      </Typography>
      <List>
        {data.interviews.length > 0 ? (
          <ListItem
            key={data.interviews.id}
            button
            onClick={() => handleInterviewClick(data.interview.id)}
            sx={{
              borderBottom: "1px solid #E0E0E0",
            }}
          >
            <ListItemText
            //   primary={`Interview: ${data.interview.name}`}
            //   secondary={`Time: ${data.interview.prepTime} mins`}
            />
          </ListItem>
        ) : (
          <ListItem
            // key={data.interview.id}
            button
            disabled
            sx={{
              borderBottom: "1px solid #E0E0E0",
            }}
          >
            <ListItemText primary="No interviews available" />
          </ListItem>
        )}
        {/* {data.interviews.map((interview) => ( */}
        {/* ))} */}
      </List>
    </Box>
  );
}

export default InterviewList;
