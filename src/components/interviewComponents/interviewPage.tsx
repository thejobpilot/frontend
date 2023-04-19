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
import {validateLocalStorageTime} from "../utils";

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
    const [timeLeft, setTimeLeft] = useState(-1);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [questions, setQuestions] = useState<QuestionData[]>([
        {question: "What is your favorite color?", answer: "", id: "0"},
    ]);
    const router = useRouter();

    useEffect(() => {
      if (props.interview) {
        let map = props.interview.questions.map((q: any) => {
          return { question: q.prompt, answer: "", id: q.id };
        });
        setQuestions(map);
      }
    }, [props.interview]);

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
        const storage = `end_time_${props.interview?.id}-${props.interview?.interviewLength}`;
        let now = new Date();
        localStorage.setItem(storage, now.toISOString());
        await router.push(`/applicant/summary/${props.interview.id}`);
    };

    const handleChange = (e: any) => {
        const newAnswer = e.target.value;
        setQuestions((prevQuestions) =>
            prevQuestions.map((q, idx) =>
                idx === currentQuestionIndex ? {...q, answer: newAnswer} : q
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
        currentQuestion && <>
            <ResponsiveAppBar/>
            <Box color="black" sx={{flexGrow: 1, mt: 8, p: 2}}>
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
                                sx={{mb: 2}}
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
                                sx={{marginTop: "auto"}}
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
                                    <Button variant="contained" onClick={handlePrevious}
                                            sx={{mt: 3, mb: 2, bgcolor: "#111E31", "&:hover": {bgcolor: "#8549a8"}}}>
                                        Previous
                                    </Button>
                                )}
                                {currentQuestionIndex < questions.length - 1 && (
                                    <Button variant="contained" onClick={handleNext}
                                            sx={{mt: 3, mb: 2, bgcolor: "#111E31", "&:hover": {bgcolor: "#8549a8"}}}>
                                        Next
                                    </Button>
                                )}
                                {currentQuestionIndex === questions.length - 1 && (
                                    <Button variant="contained" onClick={handleSubmit}
                                            sx={{mt: 3, mb: 2, bgcolor: "#111E31", "&:hover": {bgcolor: "#8549a8"}}}>
                                        Submit
                                    </Button>
                                )}
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
                <Button
                    color="primary"
                    sx={{mt: 5, mb: 2, bgcolor: "#111E31", "&:hover": {bgcolor: "#8549a8"}}}
                    variant="contained"
                    href={"/dash"}
                >
                    Exit
                </Button>
            </Box>
        </>
    );
}
