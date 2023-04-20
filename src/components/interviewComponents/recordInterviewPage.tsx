import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Countdown from "@/components/interviewComponents/countdown";
import Grid from "@mui/material/Grid";
import ResponsiveAppBar from "@/components/navBar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button, Typography } from "@mui/material";
import Question from "@/components/interviewComponents/questions";
import VideoRecorder from "@/components/interviewComponents/videoBoxForApplicantRecordingThemselves";
import { useRouter } from "next/router";
import requestSubmitTextInterview from "@/components/db/requestSubmitTextInterview";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import { validateLocalStorageTime, youtubeURLToId } from "../utils";
import requestAddTextResponse from "@/components/db/requestAddTextResponse";
import requestUploadVideoResponse from "@/components/db/requestUploadVideoResponse";

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

const RecordedInterviewPage = (props: any) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [blob, setBlob] = useState<Blob | undefined>(undefined);
  const [questions, setQuestions] = useState<QuestionData[]>([
    { question: "Question 1 prompt", answer: "", id: "" },
    // Add more questions here
  ]);
  const [cleared, setCleared] = useState(false);

  const router = useRouter();

  const handleNext = () => {
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  const handleSubmit = async () => {
    if (!blob) {
      window.alert("You cannot submit without recording a video!");
      return;
    }
    let response = await requestSubmitTextInterview(
      props.interview.id,
      props.user.email
    );
    let payload = await response.json();
    for (const question of questions) {
      await requestUploadVideoResponse(payload.id, question.id, blob!!);
    }
    await router.push(`/applicant/summary/${props.interview.id}`);
  };

  useEffect(() => {
    if (props.interview) {
      setQuestions(
        props.interview.questions.map((q: any) => {
          return { question: q.prompt, answer: "", id: q.id };
        })
      );
    }
  }, [props.interview]);

  const handleRecordingComplete = (blob: Blob) => {
    // Save the recorded video
    setBlob(blob);
  };

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
  }, [props.interview]);

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <ThemeProvider theme={theme}>
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
                height: "100%",
                display: "flex",
                flexDirection: "column",
                //   justifyContent: 'space-between',
              }}
            >
              <Question
                question={currentQuestion.question}
                questionNumber={currentQuestionIndex + 1}
              />
              {youtubeURLToId(props.interview?.videoURL) && (
                <>
                  <Typography variant="h6" fontSize="20px" sx={{ mt: 2 }}>
                    Video Instructions
                  </Typography>
                  <LiteYouTubeEmbed
                    id={
                      youtubeURLToId(props.interview.videoURL) || "RKAtQ4sJpro"
                    }
                    title="Interview Video Guidance"
                  />
                </>
              )}
              <Typography
                variant="h6"
                color="grey.700"
                fontSize={"17px"}
                sx={{
                  mt: youtubeURLToId(props.interview?.videoURL) ? 1 : "auto",
                }}
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
              <Box sx={{ mt: 2 }}>
                <Countdown
                  totalMinutes={props.interview.interviewLength}
                  startTime={props.response.startTime}
                  endTime={props.response.endTime}
                  onEnd={handleRecordingComplete}
                  message="Recording Time"
                />
              </Box>
              <Box sx={{ mt: 2 }}>
                <VideoRecorder
                  onRecordingComplete={handleRecordingComplete}
                  reset
                  currentQuestionIndex={currentQuestionIndex}
                />
              </Box>
              <Box display="flex" justifyContent="flex-end" sx={{ mt: 2 }}>
                {currentQuestionIndex > 0 && (
                  <Button
                    variant="contained"
                    onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
                    sx={{ mr: 2 }}
                  >
                    Previous
                  </Button>
                )}
                {currentQuestionIndex < questions.length - 1 && (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mr: 2 }}
                  >
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

export default RecordedInterviewPage;
