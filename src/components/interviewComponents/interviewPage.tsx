import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Countdown from "@/components/interviewComponents/countdown";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import ResponsiveAppBar from "@/components/navBar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button } from "@mui/material";
import requestSubmitTextInterview from "@/components/db/requestSubmitTextInterview";
import requestAddTextResponse from "@/components/db/requestAddTextResponse";
import { router } from "next/client";
import { useRouter } from "next/router";
import { validateLocalStorageTime } from "../utils";

interface QuestionData {
  question: string;
  id: string;
  answer: string;
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#6200ee",
    },
    secondary: {
      main: "#03dac6",
    },
  },
});

export default function InterviewPage(props: any) {
  const [cleared, setCleared] = useState(false);
  const [timeLeft, setTimeLeft] = useState(-1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<QuestionData[]>([
    { question: "What is your favorite color?", answer: "", id: "0" },
  ]);
  const router = useRouter();

  useEffect(() => {
    if (props.interview) {
      setQuestions(
        props.interview.questions.map((q) => {
          return { question: q.prompt, answer: "", id: q.id };
        })
      );
    }
    if (
      props.interview?.responses.find(
        (response: any) => response.applicantEmail === props.user.email
      )
    ) {
      setCleared(false);
      window.alert("Error: You have already responded to this interview");
      // TODO uncomment
      //router.push(`/applicant/summary/${props.interview.id}`);
    }
  }, [props.interview]);

  useEffect(() => {
    let ignore = false;
    let res = validateLocalStorageTime(
      props.interview?.interviewLength,
      `end_time_${props.interview?.id}-${props.interview?.interviewLength}`
    );
    switch (res) {
      case -1:
        setCleared(false);
        window.alert("Error: This interview has no time left");
        // TODO uncomment
        //router.push(`/applicant/summary/${props.interview?.id}`);
        return () => {
          ignore = true;
        };
      case 1:
        setCleared(false);
        let href =
          "/applicant/" +
          (props.interview.interviewType == "recorded"
            ? "videoInterview"
            : "writtenInterview") +
          "/" +
          props.interview.id;
        router.push(href);
        return () => {
          ignore = true;
        };
      default:
        break;
    }
    setCleared(true);
    return () => {
      ignore = true;
    };
  }, [props.interview, timeLeft]);

  const handlePrevious = () => {
    setCurrentQuestionIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  const handleSubmit = async () => {
    // Save the answer
    let response = await requestSubmitTextInterview(
      props.interview.id,
      props.user.email
    );
    let payload = await response.json();
    for (const question of questions) {
      await requestAddTextResponse(payload.id, question.id, question.answer);
    }
    await router.push(`/applicant/dash`);
  };

  const handleChange = (e: any) => {
    const newAnswer = e.target.value;
    setQuestions((prevQuestions) =>
      prevQuestions.map((q, idx) =>
        idx === currentQuestionIndex ? { ...q, answer: newAnswer } : q
      )
    );
  };

  const resetTimer = () => {
    const storage = `end_time_${props.interview?.id}-${props.interview?.interviewLength}`;
    const now = new Date();
    const initialEndTime = new Date(
      now.getTime() + props.interview.interviewLength * 60 * 1000
    );
    localStorage.setItem(storage, initialEndTime.toISOString());
    window.location.reload();
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <>
      <ResponsiveAppBar />
      <Box color="black" sx={{ flexGrow: 1, mt: 8, p: 2 }}>
        <Grid container spacing={4} alignItems="stretch">
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                p: 2,
                backgroundColor: "#fff",
                borderRadius: 2,
                boxShadow: 1,
                minHeight: 300,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{ mb: 2 }}
                variant="h6"
                fontWeight="normal"
                color="grey.500"
              >
                PROMPT:
              </Typography>
              <Typography variant="h5">{currentQuestion.question}</Typography>
              <Typography
                variant="h6"
                color="grey.700"
                fontSize={"17px"}
                sx={{ marginTop: "auto" }}
              >
                {`Question: ${currentQuestionIndex + 1} / ${questions.length}`}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                p: 2,
                backgroundColor: "#fff",
                borderRadius: 2,
                boxShadow: 1,
                minHeight: 300,
                height: "100%",
              }}
            >
              <Countdown
                totalTimeMinutes={
                  props.interview == null ? 0 : props.interview.interviewLength
                }
                interview={props.interview}
                updater={setTimeLeft}
              />
              <TextField
                fullWidth
                multiline
                label="Respond Here"
                rows={4}
                variant="outlined"
                value={currentQuestion.answer}
                onChange={handleChange}
              />
              <Box display="flex" justifyContent="space-between">
                {currentQuestionIndex > 0 && (
                  <Button variant="contained" onClick={handlePrevious}>
                    Previous
                  </Button>
                )}
                {currentQuestionIndex < questions.length - 1 && (
                  <Button variant="contained" onClick={handleNext}>
                    Next
                  </Button>
                )}
                {currentQuestionIndex === questions.length - 1 && (
                  <Button variant="contained" onClick={handleSubmit}>
                    Submit
                  </Button>
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Button
          color="secondary"
          sx={{ mt: 5 }}
          variant="contained"
          onClick={resetTimer}
        >
          Reset Timer
        </Button>
      </Box>
    </>
  );
}
