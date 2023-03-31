import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Chip,
} from "@mui/material";
import requestAssignInterview from "../db/requestAssignInterview";
import requestRemoveInterview from "../db/requestRemoveInterview";
import useApplicants from "../db/useApplicants";
import { userHasInterviewByID } from "../utils";

export default function ApplicantList(props: any) {
  const { applicants, isLoading, isError, mutate } = useApplicants();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{isError.message}</div>;
  if (!applicants) return <div>Failed to load</div>;

  const addToInterview = (selectedEmail: string) => {
    if (props.selected.interviewId) {
      requestAssignInterview(selectedEmail, props.selected.interviewId);
      window.alert(`Assigned interview to: ${selectedEmail}`);
      props.mutater();
      mutate();
    }
  };

  const handleDelete = (selectedEmail: string) => {
    if (props.selected.interviewId) {
      requestRemoveInterview(selectedEmail, props.selected.interviewId);
      window.alert(`Removed interview from: ${selectedEmail}`);
      props.mutater();
      mutate();
    }
  };

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
      <List style={{ maxHeight: "90%", overflow: "auto" }}>
        {applicants.length > 0 ? (
          applicants.map((applicant: any) => (
            <ListItem
              key={applicant.email}
              button={
                props.selected.interviewId &&
                !userHasInterviewByID(applicant, props.selected.interviewId)
              }
              onClick={(e) => {
                if (
                  !userHasInterviewByID(applicant, props.selected?.interviewId)
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
                        my: "8px",
                      }}
                    >
                      <div>
                      <Typography variant="body1">
                        {applicant.fullName}
                      </Typography>
                      <Typography fontWeight="normal" color="grey.500" variant="subtitle2">
                        {applicant.email}
                      </Typography>
                      </div>
                      {props.selected.interviewId &&
                        userHasInterviewByID(
                          applicant,
                          props.selected.interviewId
                        ) && (
                          <Chip
                            label="Assigned"
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
