import React, { useEffect, useState } from "react";
import { Box, Typography, Button, TextField, MenuItem } from "@mui/material";
import requestSetInterview from "../db/requestSetInterview";
import QuestionInput from "./questionInput";
import { getIdFromArray } from "../utils";

export default function InterviewEditor(props: any) {
  const [interview, setInterview] = useState<any>(null);
  const [interviewCache, setInterviewCache] = useState<any>(null);
  const [questions, setQuestions] = useState([]);

  if (props.isLoading || !props.data || !props.selected)
    return <div>Loading...</div>;
  if (props.error) return <div>{props.error.message}</div>;

  useEffect(() => {
    let positionCache = getIdFromArray(
      props.data.positions,
      props.selected?.positionId
    );
    let interviewCache = getIdFromArray(
      positionCache?.interviews,
      props.selected?.interviewId
    );
    setInterview(interviewCache);
    setInterviewCache(interviewCache);
  }, [
    props.data.positions,
    props.selected?.positionId,
    props.selected?.interviewId,
  ]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (interview) {
      requestSetInterview(
        props.selected.interviewId,
        props.selected.positionId,
        interview
      );
      props.mutate();
      props.toggleSnackbar();
    }
  };

  function updateField(e: any) {
    if (interview) {
      const { name, value } = e.target;
      // @ts-ignore
      setInterview((prev: any) => {
        return { ...prev, [name]: value };
      });
    }
  }

  function resetToDefault() {
    setInterview(interviewCache);
    setQuestions([]);
  }

  const addQuestion = () => {
    setQuestions([...questions, ""]);
  };

  const deleteQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const updateQuestion = (index: number, value: string) => {
    setQuestions(questions.map((q, i) => (i === index ? value : q)));
  };

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
              p: 2,
              fontWeight: "500",
              textAlign: "center",
            }}
          >
            {interviewCache && interviewCache.name}
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
                  value={interview.name || ""}
                  onChange={(e) => updateField(e)}
                  inputProps={{ type: "string" }}
                  required
                />
                <TextField
                  label="Company Name"
                  variant="outlined"
                  name="companyName"
                  value={interview.companyName || ""}
                  onChange={(e) => updateField(e)}
                  inputProps={{ type: "string" }}
                  required
                />
                <TextField
                  label="Preparation Time"
                  variant="outlined"
                  name="prepTime"
                  value={interview.prepTime || ""}
                  onChange={(e) => updateField(e)}
                  inputProps={{ type: "number" }}
                  required
                />
                <TextField
                  label="# Retakes"
                  variant="outlined"
                  name="retakes"
                  value={interview.retakes || ""}
                  onChange={(e) => updateField(e)}
                  inputProps={{ type: "number" }}
                  required
                />

                <TextField
                  name="interviewType"
                  label="Type"
                  value={interview.interviewType || ""}
                  onChange={(e) => updateField(e)}
                  select
                  required
                >
                  <MenuItem value={"text"}>Text Interview</MenuItem>
                  <MenuItem value={"recorded"}>Video Interview</MenuItem>
                </TextField>

                <TextField
                  label="Video Link"
                  variant="outlined"
                  name="videoURL"
                  value={interview.videoURL || ""}
                  onChange={(e) => updateField(e)}
                  inputProps={{ type: "url" }}
                />

                {questions.length > 0 && (
                  <Typography sx={{ mt: 2 }} variant="h6">
                    Questions:
                  </Typography>
                )}
                {questions.map((question, index) => (
                  <QuestionInput
                    index={index}
                    question={question}
                    updater={updateQuestion}
                    deleter={deleteQuestion}
                  />
                ))}

                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={addQuestion}
                  >
                    Add Question
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={resetToDefault}
                  >
                    Reset
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ bgcolor: "#111E31", color: "white" }}
                  >
                    Save
                  </Button>
                </Box>
              </Box>
            </Box>
          </form>
        </>
      )}
    </Box>
  );
}
