import { useUser } from "@auth0/nextjs-auth0/client";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import useUserDB from "@/components/db/useUserDB";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  AlertTitle,
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import Forbidden from "@/components/forbidden";
import { withTitle } from "@/components/utils";
import Behavioral from "@/pages/applicant/interviewDash";
import questions from "@/components/interviewComponents/questions";
import ResponseCard from "./responseCard";
import ResponsiveAppBar from "@/components/navBar";

function userHasInterviewID(user: any, id: any, updater: any, updaterq: any) {
  if (!user) {
    updater(null);
    return;
  }
  id! = parseInt(id);
  for (const i in user.interviews) {
    if (user.interviews[i].id === id) {

      let response = user.interviews[i].responses.find(
        (response: any) => response.applicantEmail === user?.email
      );
      let questions = [];
      response.textAnswers.forEach((answer: any) => {
        let question = user.interviews[i].questions.find(
          (q  : any) => q.id === answer.questionId
        );
        questions.push({
          question: question,
          answer: answer,
        });
      })

      updater(response);
      updaterq(questions);
      return;
    }
  }
  updater(null);
}

export function Summary() {
  const router = useRouter();
  const { id } = router.query;
  const [response, setResponse] = useState<any>(null);
  const [questions, setQuestions] = useState<any>(null);
  const { user, error, isLoading } = useUser();
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const {
    data,
    isLoading: isLoadingDB,
    isError,
  } = useUserDB(user ? user.email! : "");
  useEffect(() => {
    userHasInterviewID(data, id, setResponse, setQuestions);
  }, [data, id]);

  const handleQuestionClick = (e: any) => {
    e.preventDefault();
    const { value: question } = e.target;
    if (selectedQuestion === question) {
      setSelectedQuestion(null);
    } else {
      setSelectedQuestion(question);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (isLoadingDB) return <div>Loading...</div>;
  if (isError) return <div>{isError.message}</div>;

  if (response === null)
    return <Forbidden message="You do not have access to this interview" />;

    console.log(questions)
  return (
    questions && (
      <>
        <ResponsiveAppBar />
        <Container maxWidth="md" sx={{ mt: 15 }}>
          <Box sx={{ mt: 4 }}>
            <Typography variant="h4" mb={2}>
              Response Summary
            </Typography>
            <div>
              {questions.map((ans: any) => (
                <Accordion key={ans.answer.id}>
                  <AccordionSummary>
                    <Typography variant="body1">Question: {ans.question.prompt}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <ResponseCard question={ans.answer} />
                  </AccordionDetails>
                </Accordion>
              ))}
            </div>
          </Box>
        </Container>
      </>
    )
  );
}

export const getServerSideProps = withPageAuthRequired();
export default withTitle("Summary")(Summary);

// import { useUser } from "@auth0/nextjs-auth0/client";
// import { withPageAuthRequired } from "@auth0/nextjs-auth0";
// import { useRouter } from "next/router";
// import useUserDB from "@/components/db/useUserDB";
// import { useEffect, useState } from "react";
// import Forbidden from "@/components/forbidden";
// import { withTitle } from "@/components/utils";
// import Behavioral from "@/pages/applicant/interviewDash";

// export function SummaryPage() {
//   const router = useRouter();
//   const { id } = router.query;
//   const [response, setResponse] = useState<any>(null);
//   const { user, error, isLoading } = useUser();
//   const {
//     data,
//     isLoading: isLoadingDB,
//     isError,
//   } = useUserDB(user ? user.email! : "");

//   function getResponseByEmail(responses: any, email: any) {
//     if (!responses || !email) return null;
//     return responses.find((response: any) => response.applicantEmail === email);
//   }

//   useEffect(() => {
//     if (data?.responses) {
//       let found = data.responses.find((response: any) => response.interviewId === id)
//       if (found) setResponse(found);
//     }
//   }, [data, id, user]);

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>{error.message}</div>;
//   if (isLoadingDB) return <div>Loading...</div>;
//   if (isError) return <div>{isError.message}</div>;

//   console.log(response)
//   console.log(data.responses)
//   if (!response)
//     return <Forbidden message="You do not have access to this interview" />;

//   return response && <h1>{response.applicantEmail}</h1>;
// }

// export const getServerSideProps = withPageAuthRequired();
// export default withTitle("Interview Summary")(SummaryPage);