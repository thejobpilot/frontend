import { useUser } from "@auth0/nextjs-auth0/client";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import useUserDB from "@/components/db/useUserDB";
import { useEffect, useState } from "react";
import { Alert, AlertTitle } from "@mui/material";
import { Container } from "@mui/system";
import Forbidden from "@/components/forbidden";
import { withTitle } from "@/components/utils";
import Behavioral from "@/pages/applicant/interviewDash";

function userHasInterviewID(user: any, id: any, updater: any) {
  if (!user) {
    updater(null);
    return;
  }
  id! = parseInt(id);
  for (const i in user.interviews) {
    if (user.interviews[i].id === id) {
      updater(user.interviews[i]);
      return;
    }
  }
  updater(null);
}

export function Summary() {
  const router = useRouter();
  const { id } = router.query;
  const [interview, setInterview] = useState<any>(null);
  const { user, error, isLoading } = useUser();

  const {
    data,
    isLoading: isLoadingDB,
    isError,
  } = useUserDB(user ? user.email! : "");
  useEffect(() => {
    userHasInterviewID(data, id, setInterview);
    console.log(data)
  }, [data, id]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (isLoadingDB) return <div>Loading...</div>;
  if (isError) return <div>{isError.message}</div>;

  if (interview === null)
    return <Forbidden message="You do not have access to this interview" />;

    console.log(interview)
  return interview && <h1>hi</h1>
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
