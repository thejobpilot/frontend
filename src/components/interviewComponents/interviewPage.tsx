import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Countdown from "@/components/interviewComponents/countdown";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import ResponsiveAppBar from "@/components/navBar";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {Button} from "@mui/material";
import requestSubmitTextInterview from "@/components/db/requestSubmitTextInterview";
import requestAddTextResponse from "@/components/db/requestAddTextResponse";
import {router} from "next/client";
import {useRouter} from "next/router";

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
    console.log(props.interview?.interviewLength);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [questions, setQuestions] = useState<QuestionData[]>([
        {question: "What is your favorite color?", answer: "", id: "0"},
    ]);
    const router = useRouter();

    useEffect(() => {
        if (props.interview) {
            setQuestions(props.interview.questions.map(q => {
                return {question: q.prompt, answer: "", id: q.id}
            }))
        }
    }, [props.interview]);

    const handleSave = async () => {

    };

    const handlePrevious = () => {
        setCurrentQuestionIndex((prev) => prev - 1);
    };

    const handleNext = () => {
        setCurrentQuestionIndex((prev) => prev + 1);
    };

    const handleSubmit = async () => {
        // Save the answer
        let response = await requestSubmitTextInterview(props.interview.id, props.user.email);
        let payload = await response.json();
        for (const question of questions) {
            await requestAddTextResponse(payload.id, question.id, question.answer);
        }
        await router.push(`/applicant/dash`)
    };

    const handleChange = (e: any) => {
        const newAnswer = e.target.value;
        setQuestions((prevQuestions) =>
            prevQuestions.map((q, idx) =>
                idx === currentQuestionIndex ? {...q, answer: newAnswer} : q
            )
        );
        console.log(questions)
    };

    const resetTimer = () => {
      localStorage.setItem(
        "time_left",
        JSON.stringify(
          props.interview == null ? 0 : props.interview.interviewLength * 60
        )
      );
      window.location.reload();
    };

    const currentQuestion = questions[currentQuestionIndex];

    return (
      <ThemeProvider theme={theme}>
        <ResponsiveAppBar />
        <Box sx={{ flexGrow: 1, mt: 8, p: 2 }}>
          <Grid container spacing={4} alignItems="stretch">
            <Grid item xs={12} sm={6}>
              <Box
                sx={{
                  p: 2,
                  backgroundColor: "#fff",
                  borderRadius: 2,
                  boxShadow: 1,
                  minHeight: 300,
                }}
              >
                <Typography variant="h5">{currentQuestion.question}</Typography>
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
                  totalTime={
                    props.interview == null
                      ? 0
                      : props.interview.interviewLength
                  }
                />
                <TextField
                  fullWidth
                  multiline
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
      </ThemeProvider>
    );
};