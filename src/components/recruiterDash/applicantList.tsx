import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Chip,
  Button,
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

  const addToInterview = async (selectedEmail: string) => {
    if (props.selected.interviewId) {
      await requestAssignInterview(selectedEmail, props.selected.interviewId);
      await mutate();
    }
  };

  const handleDelete = async (selectedEmail: string) => {
    if (props.selected.interviewId) {
      await requestRemoveInterview(selectedEmail, props.selected.interviewId);
      await mutate();
    }
  };

  const handleAssignAll = async () => {
    const ok = confirm("Warning: Assign all will assign all listed applicants to this interview. Do you want to proceed?")
    if (!ok) return;
    for (const i in applicants) {
      await requestAssignInterview(
        applicants[i].email,
        props.selected.interviewId
      );
    }
    await mutate();
  }

  const handleRemoveAll = async () => {
    const ok = confirm("Warning: Remove all will dismiss all listed applicants from this interview. Do you want to proceed?")
    if (!ok) return;
    for (const i in applicants) {
      await requestRemoveInterview(
        applicants[i].email,
        props.selected.interviewId
      );
    }
    await mutate();
  }

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
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 2,
          mt: 2,
          mx: "auto",
        }}
      >
        <Button variant="outlined" sx={{ mr: 4 }} onClick={handleAssignAll}>
          Assign all
        </Button>
        <Button color="error" variant="outlined" onClick={handleRemoveAll}>
          Remove all
        </Button>
      </Box>
      <List style={{ maxHeight: "90%", overflow: "auto" }}>
        {applicants.length > 0 ? (
          applicants
            .sort((a: any, b: any) => {
              // Sort the interviews by companyName
              if (a.fullName < b.fullName) return -1;
              if (a.fullName > b.fullName) return 1;
              return 0;
            })
            .map((applicant: any) => (
              <ListItem
                key={applicant.email}
                button={
                  props.selected.interviewId &&
                  !userHasInterviewByID(applicant, props.selected.interviewId)
                }
                onClick={(e) => {
                  if (
                    !userHasInterviewByID(
                      applicant,
                      props.selected?.interviewId
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
                          my: "8px",
                        }}
                      >
                        <div>
                          <Typography variant="body1">
                            {applicant.fullName}
                          </Typography>
                          <Typography
                            fontWeight="normal"
                            color="grey.500"
                            variant="subtitle2"
                          >
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
