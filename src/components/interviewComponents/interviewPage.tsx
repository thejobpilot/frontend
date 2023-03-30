import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Countdown from "@/components/interviewComponents/countdown";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import ResponsiveAppBar from "@/components/navBar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button } from "@mui/material";

interface QuestionData {
  question: string;
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

const InterviewPage: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<QuestionData[]>([
    { question: "What is your favorite color?", answer: "" },
    { question: "How old are you?", answer: "" },
    { question: "Why us?", answer: "" },
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAnswer = e.target.value;
    setQuestions((prevQuestions) =>
      prevQuestions.map((q, idx) =>
        idx === currentQuestionIndex ? { ...q, answer: newAnswer } : q
      )
    );
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  const handleSubmit = () => {
    // Submit the answers
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
             <Countdown totalTime={500} />
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
      </Box>
    </ThemeProvider>
  );
};

export default InterviewPage;
