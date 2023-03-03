import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  TextField,
} from "@mui/material";
import { User, UserUserTypeEnum } from "jobpilot-backend";
import capitalizeFirstLetter from "../capitalizeFirstLetter";
import requestSetUser from "../db/requestSetUser";
import useUserDB from "../db/useUserDB";

export default function InterviewEditor(props: any) {
  const [details, setDetails] = useState<User>({
    username: props.user.email as string,
    email: props.user.email as string,
    fullName: "",
    graduationDate: "",
    gpa: 0,
    resumeLink: "",
    userType: UserUserTypeEnum.Applicant,
    retakes: true,
    jobPreference: "",
    rolePreference: "",
    locationPreference: "",
  });

  const { data, isLoading, isError, mutate } = useUserDB(props.user.email!);

  useEffect(() => {
    if (data) setDetails(data as User);
  }, [data]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    requestSetUser(details.email, details);
    mutate(details);
  };

  function updateField(e: any) {
    const { name, value } = e.target;
    setDetails((prev) => {
      return { ...prev, [name]: value };
    });
  }
  if (isError) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  return (
    <Box
      sx={{
        p: 3,
        bgcolor: "white",
        color: "black",
        position: "absolute",
        top: 55,
        right: "35%",
        height: "100%",
        width: "30%",
      }}
    >
      <Typography
        variant="h5"
        sx={{ bgcolor: "#111E31", color: "white", p: 2, textAlign: "center" }}
      >
        Interview Editor
      </Typography>

      {props.selected.interview && (
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <Box
            sx={{
              p: 3,
              bgcolor: "white",
              color: "black",
              top: 55,
              right: 0,
              height: "100%",
              width: "100%",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                label="Preparation Time"
                variant="outlined"
                name="prepTime"
                defaultValue={props.selected.interview.prepTime}
                onChange={(e) => updateField(e)}
                inputProps={{ type: "number" }}
              />
              <TextField
                label="# Retakes"
                variant="outlined"
                name="retakes"
                defaultValue={props.selected.interview.retakes}
                onChange={(e) => updateField(e)}
                inputProps={{ type: "number" }}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{ bgcolor: "#111E31", color: "white" }}
              >
                Save
              </Button>
            </Box>
          </Box>
        </form>
      )}
    </Box>
  );
}
