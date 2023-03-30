import {useState} from 'react';
import {Box, List, ListItem, ListItemText, Typography,} from '@mui/material';
import useUserDB from '../db/useUserDB';
import {UserProfile} from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';

function InterviewList(props: { user: UserProfile }) {
  const router = useRouter();

  const { data, isLoading, isError, mutate } = useUserDB(props.user.email!);
  const handleInterviewClick = (interview: any) => {
    router.push(`/interview/${interview.id}`)
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
        {data?.interviews?.length > 0 ? (
          data.interviews.map((interview: any) => (
            <ListItem
              key={interview.id}
              button
              onClick={() => handleInterviewClick(interview)}
              sx={{
                borderBottom: "1px solid #E0E0E0",
              }}
            >
              <ListItemText primary={`${interview.name}`} />
            </ListItem>
          ))
        ) : (
          <ListItem
            button
            disabled
            sx={{
              borderBottom: "1px solid #E0E0E0",
            }}
          >
            <ListItemText primary="No interviews available" />
          </ListItem>
        )}
      </List>
    </Box>
  );
}

export default InterviewList;
