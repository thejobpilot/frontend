import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import requestSetUser from "@/components/db/requestSendEmailResponse";
import CodeMirror from "@uiw/react-codemirror";
import requestUpdateScore from "@/components/db/requestUpdateScore";

type ScoreColour = "error" | "success" | "warning";

export default function ResponseReview(props: { selected: any; data: any }) {
  const [score, setScore] = useState<number>();

  const handleScoreChange = (event: any) => {
    const value = parseInt(event.target.value, 10);
    if (value >= 0 && value <= 10) {
      setScore(value);
      requestUpdateScore(
        props.selected.response.applicantEmail,
        props.selected.interviewId,
        props.selected.response.id,
        value.toString()
      );
    } else {
      setScore(0);
    }
  };

  const getScoreColour = (score: any): ScoreColour => {
    if (score > 7) return "success";
    if (score < 4) return "error";
    return "warning";
  };

  useEffect(() => {
    if (props.selected.response) {
      setScore(props.selected.response.score);
    }
  }, [props.selected.response]);

  return (
    <Box
      sx={{
        p: 3,
        bgcolor: "white",
        color: "black",
        position: "absolute",
        top: 55,
        right: 0,
        height: "100%",
        width: "30%",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          bgcolor: "#111E31",
          color: "white",
          p: 2,
          textAlign: "center",
        }}
      >
        Response Review
      </Typography>
      {props.selected.response && (
        <>
          <Box sx={{ display: "flex", justifyContent: "space-around", mt: 3 }}>
            <Button
              variant="contained"
              sx={{ bgcolor: "green", color: "white" }}
              onClick={() =>
                requestSetUser(props.selected.response.applicantEmail, true)
              }
            >
              Notify Accept
            </Button>
            <Button
              variant="contained"
              sx={{ bgcolor: "red", color: "white" }}
              onClick={() =>
                requestSetUser(props.selected.response.applicantEmail, false)
              }
            >
              Notify Denial
            </Button>
          </Box>
          <Box
            sx={{
              ml: 3,
              px: 3,
              py: 3,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              fontFamily="Oxanium, Orbitron, Roboto"
              sx={{ mb: 1 }}
            >
              {score === 0 ? `UNGRADED` : `SCORE: ${score} / 10`}
            </Typography>
            <Slider
              value={score ? score : 0}
              onChange={handleScoreChange}
              //@ts-ignore
              color={getScoreColour(score)}
              step={1}
              marks
              min={1}
              max={10}
            />
          </Box>
          <List>
            {props.selected.response.textAnswers.map(
              (answer: any, index: any) => (
                <ListItem key={index}>
                  <Card sx={{ mb: 1, width: "100%" }}>
                    <CardHeader
                      title={`Question ${index + 1}`}
                      sx={{ bgcolor: "#f5f5f5" }}
                    />
                    <CardContent>
                      <Typography fontWeight="500" sx={{ mb: 1 }}>
                        Applicant Answer:
                      </Typography>
                      <Box
                        sx={{
                          borderRadius: 2,
                          fontFamily: "monospace",
                          mb: 2,
                          px: 2,
                          py: 1.4,
                          border: "1px solid",
                          borderColor: "grey.500",
                        }}
                      >
                        {answer.answer}
                      </Box>
                      <Typography fontWeight="500" sx={{ mb: 1 }}>
                        AI Feedback:
                      </Typography>
                      <Box
                        sx={{
                          borderRadius: 2,
                          fontFamily: "monospace",
                          px: 2,
                          py: 1.4,
                          border: "1px solid",
                          borderColor: "grey.500",
                        }}
                      >
                        {answer.aiRating}
                      </Box>
                    </CardContent>
                  </Card>
                </ListItem>
              )
            )}
            {props.selected.response.videoAnswers.map(
              (answer: any, index: any) => (
                <ListItem key={index}>
                  <Card sx={{ mb: 1, width: "100%" }}>
                    <CardHeader
                      title={`Question ${index + 1}`}
                      sx={{ bgcolor: "#f5f5f5" }}
                    />
                    <CardContent>
                      <Typography>{answer.videoURL}</Typography>
                      <Typography> AI Review: {answer.aiRating}</Typography>
                    </CardContent>
                  </Card>
                </ListItem>
              )
            )}
          </List>
        </>
      )}
    </Box>
  );
}
