import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import { blueGrey } from "@mui/material/colors";
import requestStartResponse from "../db/requestStartResponse";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


export default function interviewDash(props: {
  interview: any;
  user: any;
  handleStart: any;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: blueGrey[50],
      }}
    >
      <Box
        component={Paper}
        elevation={3}
        sx={{
          width: "90%",
          height: "70%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
          mt: 5,
          p: 4,
        }}
      >
        <Typography
          variant="h2"
          sx={{
            alignSelf: "center",
            textAlign: "center",
          }}
        >
          Hello, {props.user.fullName}
        </Typography>

        <Typography
          variant="h5"
          sx={{
            alignSelf: "center",
            textAlign: "center",
          }}
        >
          Welcome to the next step for your interview process with{" "}
          <b>{props.interview.companyName}</b>, demorecruiter has assigned you an interview! 
          <br />
          This interview is for position: <b>{props.interview.name} </b>and there
          will be <b>{props.interview.questions?.length || 0} </b>questions. Each
          question will have <b>{`${props.interview.prepTime} min` || "no"}{" "}</b>
          prep time, <b>{`${props.interview.interviewLength} min` || "no"}{" "}</b>
          response time, and there will be <b>{props.interview.retakes || "no"}{" "}</b>
          retakes. This interview is due <b>12/12/2023</b>. 
        </Typography>

            <Accordion sx={{ width: "95%" }}>
     
            <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography  sx={{
        textAlign: "center",
        width: "100%",
      }}>Learn more about how it will look like!</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Typography
          variant="h6"
          sx={{
            alignSelf: "center",
            textAlign: "center",
          }}
        >
          Each question will have the prompt and the question number on the
          left side of the page. The top left will show the question you are
          on and how many questions total there are. The prompt will be
          below the question number in text form. If applicable it can also
          be shown through a video on the left hand side as well. On the
          right hand side you will have a count down. The count down can
          represent the prep time if applicable. Prep time is the time that
          is given for you before you answer the prompt to brainstorm an
          answer. After the prep time then you will proceed to record your
          submission for the interview which will have a response time count
          down. The response time represents how long you have to answer the
          prompt. If applicable after a submission you may have the option
          to retake a submission which will override your previous
          submission. On the right hand side there will either be a video of
          your camera showing what is being recorded and what will be
          submitted. Otherwise itwill be a textbox where you can type out your response. Best of luck!
            <br /> <br /> To get started, we need a front-facing camera and
            microphone.
            </Typography>
        </AccordionDetails>
      </Accordion>
            <Stack
      spacing={2}
      direction="row"
      alignItems="flex-end"
      justifyContent="center"
      sx={{ mt: 2 }}
    >
      <Button
        onClick={props.handleStart}
        variant="contained"
        sx={{
          width: "100%",
          bgcolor: blueGrey[700],
          "&:hover": { bgcolor: blueGrey[800] },
        }}
      >
        Continue
      </Button>
    </Stack>
  </Box>
</div>

);
}