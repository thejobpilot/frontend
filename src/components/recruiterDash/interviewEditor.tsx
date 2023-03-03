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
import { Interview, User, UserUserTypeEnum } from "jobpilot-backend";
import requestSetInterview from "../db/requestSetInterview";

export default function InterviewEditor(props: any) {
  const [interview, setInterview] = useState<Interview>(
    props.selected.interview
  );

  const handleSubmit = (e: any) => {
    e.preventDefault();
    requestSetInterview(
      props.selected.interview.id,
      props.selected.position.id,
      interview
    );
  };

  function updateField(e: any) {
    const { name, value } = e.target;
    setInterview((prev) => {
      console.log("upate")
      return { ...prev, [name]: value };
    });
  }

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

      {interview && (
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
                defaultValue={interview.prepTime}
                onChange={(e) => updateField(e)}
                inputProps={{ type: "number" }}
              />
              <TextField
                label="# Retakes"
                variant="outlined"
                name="retakes"
                defaultValue={interview.retakes}
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
