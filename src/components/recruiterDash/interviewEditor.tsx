import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  TextField,
} from "@mui/material";
import { Interview, Position, User, UserUserTypeEnum } from "jobpilot-backend";
import requestSetInterview from "../db/requestSetInterview";

export default function InterviewEditor(props: any) {
  const [interview, setInterview] = useState(props.selected.interview);
  const [, updateState] = React.useState();
  useEffect(() => {
    setInterview(props.selected.interview);
    updateState(undefined);
  }, [props.selected, props.selected.interview]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (interview) {
      requestSetInterview(
        props.selected.interview.id,
        props.selected.position.id,
        interview
      );
      props.mutate();
      props.setInterview(null);
      props.setPosition(null);
    }
  };

  function updateField(e: any) {
    if (interview) {
      const { name, value } = e.target;
      // @ts-ignore
      setInterview((prev) => {
        return { ...prev, [name]: value };
      });
    }
  }

  if (props.isLoading) return <div>Loading...</div>;
  if (props.error) return <div>{props.error.message}</div>;
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
        <>
          <Typography
            variant="h5"
            sx={{
              color: "black",
              p: 2,
              textAlign: "center",
            }}
          >
            {props.selected.interview && props.selected.interview.name}
          </Typography>
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
                  label="Interview Name"
                  variant="outlined"
                  name="name"
                  value={interview.name}
                  onChange={(e) => updateField(e)}
                  inputProps={{ type: "string" }}
                />
                <TextField
                  label="Preparation Time"
                  variant="outlined"
                  name="prepTime"
                  value={interview.prepTime}
                  onChange={(e) => updateField(e)}
                  inputProps={{ type: "number" }}
                />
                <TextField
                  label="# Retakes"
                  variant="outlined"
                  name="retakes"
                  value={interview.retakes}
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
        </>
      )}
    </Box>
  );
}
