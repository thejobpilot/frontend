import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { LanguageSupport } from "@codemirror/language";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { LoadingButton } from "@mui/lab";
import Terminal, {
  ColorMode,
  TerminalInput,
  TerminalOutput,
} from "react-terminal-ui";
import requestAddTextResponse from "@/components/db/requestAddTextResponse";
import requestEndResponse from "@/components/db/requestEndResponse";
import { useRouter } from "next/router";
import Countdown from "./countdown";

const MainContainer = styled(Box)({
  display: "flex",
  height: "100vh",
  background: "#111E31",
  color: "white",
  marginTop: "60px",
});

const LeftContainer = styled(Paper)({
  flex: "1",
  margin: "1rem",
  padding: "1rem",
  background: "#111E31",
  color: "white",
  overflowY: "auto",
  maxWidth: "30%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});

const MiddleContainer = styled(Paper)({
  flex: "2",
  margin: "1rem",
  padding: "1rem",
  background: "#111E31",
  color: "white",
  maxWidth: "40%",
});

const RightContainer = styled(Paper)({
  flex: "3",
  margin: "1rem",
  padding: "1rem",
  background: "#111E31",
  color: "white",
  maxWidth: "30%",
  ".react-terminal-wrapper": {
    marginTop: "40px",
  },
});

const NavigationButton = styled(Button)({
  margin: "0.5rem",
  background: "white",
  color: "#111E31",
});

interface CodingQuestion {
  title: string;
  id: string;
  description: string;
  code: string;
  language: string;
}

const CodingInterviewPage = (props: {
  user: any;
  interview: any;
  response: any;
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [submitting, setSubmitting] = useState(false);
  const [question, setQuestion] = useState<CodingQuestion[]>([
    {
      id: "",
      language: "javascript",
      title: "Instructions",
      description: "Some instructions here",
      code: 'console.log("Hello user!");',
    },
    {
      id: "",
      language: "python",
      title: "Instructions",
      description: "Some instructions here",
      code: 'print("Hello user!")',
    },
    {
      id: "",
      language: "java",
      title: "Instructions",
      description: "Some instructions here",
      code: `class Main {
    public static void main(String[] args) {
        System.out.println("Hello User");
    }
}`,
    },
  ]);
  const [terminalLineData, setTerminalLineData] = useState([
    <TerminalOutput
      key={1}
    >{`To test your code, type "runtests".`}</TerminalOutput>,
  ]);

  useEffect(() => {
    if (props.interview) {
      setQuestion((questions) => {
        questions.forEach((q) => {
          q.description = props.interview.questions[0].prompt;
          q.id = props.interview.questions[0].id;
        });
        return questions;
      });
    }
  }, [props.interview]);

  const handleLanguageChange = (event: any) => {
    setSelectedLanguage(event.target.value as string);
  };

  const onChange = (value: any) => {
    setQuestion((questions) => {
      questions.find((q) => q.language === selectedLanguage)!!.code = value;
      return questions;
    });
  };

  let languageExtension: LanguageSupport | null = null;
  switch (selectedLanguage) {
    case "javascript":
      languageExtension = javascript({ jsx: true });
      break;
    case "python":
      languageExtension = python();
      break;
    case "java":
      languageExtension = java();
      break;
  }

  const onTerminalCommand = async (input: string) => {
    let ld = [...terminalLineData];
    ld.push(<TerminalInput>{input}</TerminalInput>);
    if (input.toLocaleLowerCase().trim() === "clear") {
      ld = [];
    } else if (input.toLocaleLowerCase().trim() === "runtests") {
      ld.push(<TerminalOutput>Running tests...</TerminalOutput>);
      const stdout: JSX.Element = await startSubmission(
        question.find((q) => q.language === selectedLanguage)!!.code
      );
      ld.push(stdout);
    } else if (input) {
      ld.push(<TerminalOutput>Unrecognized command</TerminalOutput>);
    }
    setTerminalLineData(ld);
  };
  const router = useRouter();

  const handleSubmit = async () => {
    setSubmitting(true);
    let selectedQuestion = question.find(
      (q) => q.language === selectedLanguage
    );
    await requestEndResponse(props.user.email, props.response);
    await requestAddTextResponse(
      props.response.id,
      selectedQuestion!!.id,
      selectedQuestion!!.code
    );
    await router.push(`/applicant/summary/${props.interview.id}`);
  };

  const startSubmission = async (codeInput: string): Promise<JSX.Element> => {
    const axios = require("axios");
    let languageId = -1;
    switch (selectedLanguage) {
      case "javascript":
        languageId = 93;
        break;
      case "python":
        languageId = 71;
        break;
      case "java":
        languageId = 91;
        break;
    }
    const data = {
      base64_encoded: true,
      language_id: languageId,
      source_code: Buffer.from(codeInput).toString("base64"),
      stdin: Buffer.from("5").toString("base64"),
    };

    const options = {
      method: "POST",
      url: "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true",
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Key": "32f99babe7msh7cd831db4e724c6p180762jsna66ec14a4ef9",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
      data: JSON.stringify(data),
    };
    const response = await axios.request(options);
    console.log(response.data);
    return await pollSubmission(response.data.token);
  };

  const pollSubmission = async (token: string): Promise<JSX.Element> => {
    const axios = require("axios");

    const options = {
      method: "GET",
      url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Key": "32f99babe7msh7cd831db4e724c6p180762jsna66ec14a4ef9",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
    };

    let response = await axios.request(options);
    console.log(response.data);
    if (response.data.stderr) {
      return (
        <TerminalOutput>
          ERROR: {Buffer.from(response.data.stderr, "base64").toString("utf-8")}
        </TerminalOutput>
      );
    } else if (response.data.stdout) {
      return (
        <TerminalOutput>
          Output:{Buffer.from(response.data.stdout, "base64").toString("utf-8")}
        </TerminalOutput>
      );
    } else if (response.data.compile_output) {
      return (
        <TerminalOutput>
          Compile error:
          {Buffer.from(response.data.compile_output, "base64").toString(
            "utf-8"
          )}
        </TerminalOutput>
      );
    } else {
      return <TerminalOutput>Unknown error when running code.</TerminalOutput>;
    }
  };

  return (
    <MainContainer>
      <LeftContainer>
        <Box>
          <Typography variant="h5" gutterBottom>
            {question.find((q) => q.language === selectedLanguage)!!.title}
          </Typography>
          <Typography variant="body1">
            {
              question.find((q) => q.language === selectedLanguage)!!
                .description
            }
          </Typography>
        </Box>
        <Box
          sx={{
            borderRadius: 2,
            fontFamily: "monospace",
            mb: 15,
            px: 2,
            py: 1.4,
            border: "1px solid",
            background: "white",
          }}
        >
          <Countdown
            totalMinutes={props.interview.interviewLength}
            startTime={props.response.startTime}
            endTime={props.response.endTime}
            onEnd={handleSubmit}
          />
        </Box>
      </LeftContainer>
      <MiddleContainer>
        <Select
          variant="outlined"
          value={selectedLanguage}
          onChange={handleLanguageChange}
          sx={{
            border: "1px solid grey",
            color: "white",
            marginBottom: "1rem",
            "& .MuiSvgIcon-root": {
              color: "white",
            },
          }}
        >
          <MenuItem value="javascript">JavaScript</MenuItem>
          <MenuItem value="python">Python</MenuItem>
          <MenuItem value="java">Java</MenuItem>
        </Select>

        <Box sx={{ width: "100%" }}>
          <CodeMirror
            value={question.find((q) => q.language === selectedLanguage)!!.code}
            theme="dark"
            extensions={[languageExtension!!]}
            onChange={onChange}
            height="calc(100vh - 250px)"
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", mt: "10px" }}>
          <LoadingButton
            variant="outlined"
            loading={submitting}
            color="error"
            onClick={handleSubmit}
            sx={{ width: "100%" }}
          >
            <span>Submit</span>
          </LoadingButton>
        </Box>
      </MiddleContainer>
      <RightContainer>
        <Typography variant="h6" gutterBottom>
          Testing
        </Typography>
        <Terminal
          name="Terminal"
          colorMode={ColorMode.Dark}
          onInput={onTerminalCommand}
        >
          {terminalLineData}
        </Terminal>
      </RightContainer>
    </MainContainer>
  );
};

export default CodingInterviewPage;
