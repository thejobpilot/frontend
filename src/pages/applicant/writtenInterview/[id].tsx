import ResponsiveAppBar from "@/components/navBar";
import InterviewPage from "@/components/interviewComponents/interviewPage";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import useUserDB from "@/components/db/useUserDB";
import { InterviewState, getInterviewState, withTitle } from "@/components/utils";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export function Written(props: any) {
  const router = useRouter();
  const { id } = router.query;
  const { user, error, isLoading } = useUser();
  const [cleared, setCleared] = useState(false);
  const [interview, setInterview] = useState<any>(null);
  const [response, setResponse] = useState<any>(null);

  const {
        data,
        isLoading: isLoadingDB,
        isError,
    } = useUserDB(user ? user.email! : "");
    useEffect(() => {
        if (data && data.interviews) {
            setInterview(data.interviews.find((interview: any) => interview.id == id)
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
    console.log(state);
    switch (state) {
      case InterviewState.FINISHED:
        setCleared(false);
        window.alert("Error: This interview has no time left");
        router.push(`/applicant/summary/${interview.id}`);
        return () => {
          ignore = true;
        };
      case InterviewState.IN_PROGRESS:
        setCleared(false);
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
    setCleared(true);
  }, [interview, response]);

  console.log(response)
  return (
    <>
      <ResponsiveAppBar></ResponsiveAppBar>
      <InterviewPage user={data} response={response} interview={interview}></InterviewPage>
    </>
  );
}

export const getServerSideProps = withPageAuthRequired();
export default withTitle("Written Interview")(Written);
