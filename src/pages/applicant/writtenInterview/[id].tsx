import ResponsiveAppBar from "@/components/navBar";
import InterviewPage from "@/components/interviewComponents/interviewPage";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import useUserDB from "@/components/db/useUserDB";
import {
  InterviewState,
  getInterviewState,
  withTitle,
} from "@/components/utils";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export function Written(props: any) {
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
  if (data.userType != "applicant") router.push(`/${data.userType}/dash`);

  return (
    <>
      <ResponsiveAppBar></ResponsiveAppBar>
      <InterviewPage
        user={data}
        response={response}
        interview={interview}
      ></InterviewPage>
    </>
  );
}

export const getServerSideProps = withPageAuthRequired();
export default withTitle("Written Interview")(Written);
