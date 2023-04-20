import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import useUserDB from "../db/useUserDB";
import { UserProfile } from "@auth0/nextjs-auth0/client";
import InterviewListItem from "./interviewListItem";

export default function InterviewList(props: { user: UserProfile }) {
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
          data.interviews
            .sort((a: any, b: any) => {
              // Sort the interviews by companyName
              if (a.companyName < b.companyName) return -1;
              if (a.companyName > b.companyName) return 1;
              return 0;
            })
            .map((i: any) => {
              return <InterviewListItem key={i.id} interview={i} />;
            })
        ) : (
          <ListItemButton disabled>
            <ListItemText primary="No interviews available" />
          </ListItemButton>
        )}
      </List>
    </Box>
  );
}
