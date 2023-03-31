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

export function Interview() {
  const router = useRouter();
  const [interview, setInterview] = useState<any>(null);
  const { user, error, isLoading } = useUser();
  const { id } = router.query;

  const {
    data,
    isLoading: isLoadingDB,
    isError,
  } = useUserDB(user ? user.email! : "");
  useEffect(() => {
    userHasInterviewID(data, id, setInterview);
  }, [data, id]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (isLoadingDB) return <div>Loading...</div>;
  if (isError) return <div>{isError.message}</div>;

  if (interview === null)
    return <Forbidden message="You do not have access to this interview" />;

  console.log(interview);

  return (
    interview && (
      <Behavioral interview={interview}></Behavioral>
    )
  );
}

export const getServerSideProps = withPageAuthRequired();
export default withTitle("Interview Assistant")(Interview);