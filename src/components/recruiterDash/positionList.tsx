import { useState } from "react";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import { Interview, Position, User } from "jobpilot-backend";
import useUserDB from "@/components/db/useUserDB";

function getInterviewByID(user: User, id: number) {
  if (!user.interviews) return null;
  for (let i = 0; i < user.interviews.length; i++) {
    if (user.interviews[i].id === id) return user.interviews[i];
  }
}

function getPosByID(user: User, id: number) {
  if (!user.positions) return null;
  for (let i = 0; i < user.positions.length; i++) {
    if (user.positions[i].id === id) return user.positions[i];
  }
}

export default function PositionList(props: any) {
  const {
    data,
    isLoading: isLoadingDB,
    isError,
    mutate,
  } = useUserDB(props.user.email!);

  const handleBackClick = () => {
    props.interviewSelector(null);
    props.positionSelector(null);
  };

  if (isError) return <div>failed to load</div>;
  if (isLoadingDB) return <div>loading...</div>;
  // @ts-ignore
  // @ts-ignore
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
        width: "30%",
      }}
    >
      <Typography
        variant="h5"
        sx={{ bgcolor: "#111E31", color: "white", p: 2, textAlign: "center" }}
      >
        {props.selected.position != null ? (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="h5"
              sx={{ mr: 2, cursor: "pointer" }}
              onClick={handleBackClick}
            >
              {"<"}
            </Typography>
            <Typography variant="h5">
                {props.selected.position.name}
            </Typography>
          </Box>
        ) : (
          "Listed Positions"
        )}
      </Typography>
      <List>
        {props.selected.position == null
          ? data.positions.map((position: Position) => (
              <ListItem
                key={position.id}
                button
                onClick={() => {props.positionSelector(position)}}
                sx={{ borderBottom: "1px solid #E0E0E0" }}
              >
                <ListItemText primary={position.name} />
              </ListItem>
            ))
          : props.selected.position.interviews?.map((interview: Interview) => (
              <ListItem
                key={interview.id}
                button
                onClick={() => {props.interviewSelector(interview)}}
                sx={{ borderBottom: "1px solid #E0E0E0" }}
              >
                <ListItemText primary={interview.name} />
              </ListItem>
            ))}
      </List>
    </Box>
  );
}
