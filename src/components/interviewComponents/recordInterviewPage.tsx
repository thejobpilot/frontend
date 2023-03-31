import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Countdown from "@/components/interviewComponents/countdown";
import Grid from "@mui/material/Grid";
import ResponsiveAppBar from "@/components/navBar";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {Button} from "@mui/material";
import Question from "@/components/interviewComponents/questions";
import VideoRecorder from "@/components/interviewComponents/videoBoxForApplicantRecordingThemselves";
import {useRouter} from "next/router";
import requestSubmitTextInterview from "@/components/db/requestSubmitTextInterview";

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

const RecordedInterviewPage = (props: { user: any, interview: any }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [questions, setQuestions] = useState<QuestionData[]>([
        {question: "Question 1 prompt", answer: "", id:""},
        // Add more questions here
    ]);
    const router = useRouter();

    const handleNext = () => {
        setCurrentQuestionIndex((prev) => prev + 1);
    };

    useEffect(() => {
        if (props.interview) {
            setQuestions(props.interview.questions.map(q => {
                return {question: q.prompt, answer: "", id: q.id}
            }))
        }
    }, [props.interview]);

    const handleRecordingComplete = (blob: Blob) => {
        // Save the recorded video
    };

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <ThemeProvider theme={theme}>
            <ResponsiveAppBar/>
            <Box sx={{flexGrow: 1, mt: 8, p: 2}}>
                <Grid container spacing={4} alignItems="stretch">
                    <Grid item xs={12} sm={6}>
                        <Box
                            sx={{
                                p: 2,
                                backgroundColor: "#fff",
                                borderRadius: 2,
                                boxShadow: 1,
                                minHeight: 300,
                                height: '100%',
                                // display: 'flex',
                                //   flexDirection: 'column',
                                //   justifyContent: 'space-between',
                            }}
                        >
                            <Question
                                question={currentQuestion.question}
                                questionNumber={currentQuestionIndex + 1}
                            />
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
                            <Box sx={{mt: 2}}>
                                <Countdown totalTime={props.interview == null ? 0 : props.interview.interviewLength}/>

                            </Box>
                            <Box sx={{mt: 2}}>
                                <VideoRecorder
                                    onRecordingComplete={handleRecordingComplete}
                                    reset
                                    currentQuestionIndex={currentQuestionIndex}
                                />
                            </Box>
                            <Box display="flex" justifyContent="flex-end" sx={{mt: 2}}>
                                {currentQuestionIndex > 0 && (
                                    <Button
                                        variant="contained"
                                        onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
                                        sx={{mr: 2}}
                                    >
                                        Previous
                                    </Button>
                                )}
                                {currentQuestionIndex < questions.length - 1 && (
                                    <Button
                                        variant="contained"
                                        onClick={handleNext}
                                        sx={{mr: 2}}
                                    >
                                        Next
                                    </Button>
                                )}
                                {currentQuestionIndex === questions.length - 1 && (
                                    <Button variant="contained" onClick={async () => {
                                        let response = await requestSubmitTextInterview(props.interview.id, props.user.email);
                                        await router.push(`/applicant/dash`)
                                    }}>
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

export default RecordedInterviewPage;
