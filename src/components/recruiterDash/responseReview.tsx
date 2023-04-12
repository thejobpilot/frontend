import React, {useEffect, useState} from "react";
import {Box, Button, Card, CardContent, CardHeader, List, ListItem, TextField, Typography,} from "@mui/material";
import requestSetUser from "@/components/db/requestSendEmailResponse";
import requestUpdateScore from "@/components/db/requestUpdateScore";

export default function ResponseReview(props: { selected: any, data: any }) {
    const [score, setScore] = useState<number | "">();

    const handleScoreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(event.target.value, 10);
      if (value >= 0 && value <= 10) {
        setScore(value);
        requestUpdateScore(
          props.selected.response.applicantEmail,
          props.selected.interviewId,
          props.selected.responseId,
          value.toString()
        );
      } else {
        setScore("");
      }
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
                    <Box sx={{display: "flex", justifyContent: "space-around", my: 2}}>
                        <Button
                            variant="contained"
                            sx={{bgcolor: "green", color: "white"}}
                            onClick={() =>
                                requestSetUser(props.selected.response.applicantEmail, true)
                            }
                        >
                            Accept
                        </Button>
                        <Button
                            variant="contained"
                            sx={{bgcolor: "red", color: "white"}}
                            onClick={() =>
                                requestSetUser(props.selected.response.applicantEmail, false)
                            }
                        >
                            Denied
                        </Button>
                    </Box>
                    <Box sx={{mb: 2, ml: 3, mt: 4}}>
                        <TextField
                            type="number"
                            label="Score"
                            variant="outlined"
                            value={score}
                            onChange={handleScoreChange}
                            inputProps={{
                                min: 0,
                                max: 10,
                            }}
                        />
                    </Box>
                    <List>
                        {props.selected.response.textAnswers.map((answer: any, index: any) => (
                            <ListItem key={index}>
                                <Card sx={{mb: 1, width: "100%"}}>
                                    <CardHeader
                                        title={`Question ${index + 1}`}
                                        sx={{bgcolor: "#f5f5f5"}}
                                    />
                                    <CardContent>
                                        <Typography>{answer.answer}</Typography>
                                    </CardContent>
                                </Card>
                            </ListItem>
                        ))}
                    </List>
                </>
            )}
        </Box>
    );
}
