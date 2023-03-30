import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import requestSetInterview from "../db/requestSetInterview";

export default function InterviewEditor(props: any) {
  const [interview, setInterview] = useState(props.selected.interview);
  const [questions, setQuestions] = useState([]);
  const [, updateState] = React.useState();
  useEffect(() => {
    setInterview(props.selected.interview);
    updateState(undefined);
  }, [props.selected, props.selected.interview]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (interview) {
      interview.companyName = "Google";
      interview.questions = questions;
      requestSetInterview(
          props.selected.interview.id,
          props.selected.position.id,
          interview
      );
      props.mutate();
      console.log(props.selected.interview)
      console.log(interview)
      props.setInterview(null);
      props.setPosition(null);
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

  const addQuestion = () => {
    setQuestions([...questions, ""]);
  };

  const deleteQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const updateQuestion = (index: number, value: string) => {
    setQuestions(questions.map((q, i) => (i === index ? value : q)));
  };

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
                        required
                    />
                    <TextField
                        label="Preparation Time"
                        variant="outlined"
                        name="prepTime"
                        value={interview.prepTime}
                        onChange={(e) => updateField(e)}
                        inputProps={{ type: "number" }}
                        required
                    />
                    <TextField
                        label="# Retakes"
                        variant="outlined"
                        name="retakes"
                        value={interview.retakes}
                        onChange={(e) => updateField(e)}
                        inputProps={{ type: "number" }}
                        required
                    />
                    {questions.map((question, index) => (
                        <Box key={index} sx={{ display: "flex", flexDirection: "row", gap: 2, alignItems: "center" }}>
                          <TextField
                              label={`Question ${index + 1}`}
                              variant="outlined"
                              value={question}
                              onChange={(e) => updateQuestion(index, e.target.value)}
                              inputProps={{ type: "string" }}
                              required
                          />
                          <Button
                              variant="contained"
                              color="error"
                              onClick={() => deleteQuestion(index)}
                          >
                            Delete
                          </Button>
                        </Box>
                    ))}
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                      <Button
                          variant="contained"
                          color="primary"
                          onClick={addQuestion}
                      >
                        Add Question
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
