import { useUser } from "@auth0/nextjs-auth0/client";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import useUserDB from "@/components/db/useUserDB";
import { useEffect, useState } from "react";
import Forbidden from "@/components/forbidden";
import {
  getInterviewState,
  InterviewState,
  withTitle,
} from "@/components/utils";
import CodingInterviewPage from "@/components/interviewComponents/codingInterview";
import ResponsiveAppBar from "@/components/navBar";

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
  const { id } = router.query;
  const { user, error, isLoading } = useUser();
  const [interview, setInterview] = useState<any>(null);
  const [response, setResponse] = useState<any>(null);

  const {
    data,
    isLoading: isLoadingDB,
    isError,
  } = useUserDB(user ? user.email! : "");
  useEffect(() => {
    if (data && data.interviews) {
      setInterview(
        data.interviews.find((interview: any) => interview.id == id)
      );
    }
  }, [data, id]);

  useEffect(() => {
    if (interview) {
      setResponse(
        interview.responses?.find(
          (res: any) => res?.applicantEmail === user?.email
        )
      );
    }
  }, [interview]);

  useEffect(() => {
    let ignore = false;
    let state = getInterviewState(response);
    switch (state) {
      case InterviewState.FINISHED:
        window.alert("Error: This interview has no time left");
        router.push(`/applicant/summary/${interview.id}`);
        return () => {
          ignore = true;
        };
      case InterviewState.IN_PROGRESS:
        let href =
          "/applicant/" +
          (interview.interviewType == "recorded"
            ? "videoInterview"
            : "writtenInterview") +
          "/" +
          interview.id;
        router.push(href);
        return () => {
          ignore = true;
        };
      default:
        break;
    }
  }, [interview, response]);

  console.log(response);
  if (error) return <div>Failed to load</div>;
  if (isError) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  if (isLoadingDB || !response || !interview) return <div>Loading...</div>;

  if (interview === null)
    return <Forbidden message="You do not have access to this interview" />;

  return (
    interview && (
      <>
        <ResponsiveAppBar></ResponsiveAppBar>
        <CodingInterviewPage
          user={data}
          response={response}
          interview={interview}
        ></CodingInterviewPage>
      </>
    )
  );
}

export const getServerSideProps = withPageAuthRequired();
export default withTitle("Interview Assistant")(Interview);
