import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Chip,
} from "@mui/material";
import useUserDB from "../db/useUserDB";
import useAllUsers from "../db/useAllUsers";
import requestAssignInterview from "../db/requestAssignInterview";
import requestRemoveInterview from "../db/requestRemoveInterview";
import useApplicants from "../db/useApplicants";
import { userHasInterviewByID } from "../utils";

// function searchInterviewForEmail(user: User, email: string) {
//   for (const pos of user.positions || []) {
//     const intersection = pos.interviews?.filter((element) =>
//       user.interviews?.includes(element)
//     );
//     if (intersection) {
//       console.log("intersection", intersection);
//       return intersection[0].id;
//     }
//   }
// }

export default function ApplicantList(props: any) {
  const { applicants, isLoading, isError, mutate } = useApplicants();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{isError.message}</div>;
  if (!applicants) return <div>Failed to load</div>;

  const addToInterview = (selectedEmail: string) => {
    if (props.selected.interview) {
      requestAssignInterview(selectedEmail, props.selected.interview.id);
      window.alert(`Assigned interview to: ${selectedEmail}`);
      props.mutater();
      mutate();
    }
  };

  const handleDelete = (selectedEmail: string) => {
    if (props.selected.interview) {
      requestRemoveInterview(selectedEmail, props.selected.interview.id);
      window.alert(`Removed interview from: ${selectedEmail}`);
      props.mutater();
      mutate();
    }
  };

  // const checkIfSent = (email: any) => {
  //   return searchInterviewForEmail(props.user, email)
  // }

  return (
    <Box
      sx={{
        p: 3,
        bgcolor: "white",
        color: "black",
        position: "absolute",
        top: 55,
        right: 0,
        height: "100%",
        width: "30%",
      }}
    >
      <Typography
        variant="h5"
        sx={{ bgcolor: "#111E31", color: "white", p: 2, textAlign: "center" }}
      >
        Applicant List
      </Typography>
      <List>
        {applicants.length > 0 ? (
          applicants.map((applicant: any) => (
            <ListItem
              key={applicant.email}
              button={
                props.selected.interview &&
                !userHasInterviewByID(applicant, props.selected.interview.id)
              }
              onClick={(e) => {
                if (
                  !userHasInterviewByID(
                    applicant,
                    props.selected.interview
                      ? props.selected.interview.id
                      : null
                  )
                )
                  addToInterview(applicant.email);
              }}
              sx={{ borderBottom: `1px solid #E0E0E0` }}
            >
              <ListItemText
                primary={
                  <>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        my: "5px",
                      }}
                    >
                      {applicant.email}
                      {props.selected.interview &&
                        userHasInterviewByID(
                          applicant,
                          props.selected.interview.id
                        ) && (
                          <Chip
                            label="Assigned"
                            color="info"
                            //variant="outlined"
                            onDelete={(e) => handleDelete(applicant.email)}
                          />
                        )}
                    </Box>
                  </>
                }
              />
            </ListItem>
          ))
        ) : (
          <ListItem disabled sx={{ borderBottom: "1px solid #E0E0E0" }}>
            <ListItemText primary={"No applicants found"} />
          </ListItem>
        )}
      </List>
    </Box>
  );
}
