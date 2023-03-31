import {useState} from 'react';
import {Box, IconButton, List, ListItem, ListItemText, Typography,} from '@mui/material';
import useUserDB from '../db/useUserDB';
import {UserProfile} from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';
import { validateLocalStorageTime } from '../utils';
import { CheckCircleOutline, PendingActions } from '@mui/icons-material';

function InterviewList(props: { user: UserProfile }) {
  const router = useRouter();

  const { data, isLoading, isError, mutate } = useUserDB(props.user.email!);

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
          data.interviews.map((interview: any) => {
            let path = "/";
            let icon = null;
            let res = validateLocalStorageTime(
              interview.interviewLength,
              `end_time_${interview.id}-${interview.interviewLength}`
            );
            switch (res) {
              case -1:
                path = `/applicant/summary/${interview.id}`;
                icon = <CheckCircleOutline color="success" />
                break;
              case 1:
                path =
                  "/applicant/" +
                  (interview.interviewType == "recorded"
                    ? "videoInterview"
                    : "writtenInterview") +
                  "/" +
                  interview.id;
                icon = <PendingActions color="warning" />
                break;
            }
            return (
            <ListItem
              key={interview.id}
              button
              onClick={() => router.push(path)}
              secondaryAction={icon && <IconButton disabled>{icon}</IconButton>}
              sx={{
                borderBottom: "1px solid #E0E0E0",
              }}
            >
              <ListItemText primary={`${interview.companyName}: ${interview.name}`} />
            </ListItem>
          )})
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
