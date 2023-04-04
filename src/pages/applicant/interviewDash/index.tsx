import { Inter } from "@next/font/google";
import ResponsiveAppBar from "@/components/navBar";
import Countdown from "@/components/interviewComponents/countdown";
import InterviewPage from "@/components/interviewComponents/interviewPage";
import Question from "@/components/interviewComponents/questions";
import InterviewDash from "@/components/behavioralInterview/interviewDash";
import useUserDB from "@/components/db/useUserDB";
import React, { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/router";
import { validateLocalStorageTime } from "@/components/utils";

const inter = Inter({ subsets: ["latin"] });

export default function Behavioral(props: { interview: any }) {
  const [cleared, setCleared] = useState(false);
  const router = useRouter();
  const { user, error, isLoading } = useUser();
  const { data, isError, isLoading: loading, mutate } = useUserDB(user?.email);

  useEffect(() => {
    let ignore = false;
    if (
      props.interview?.responses.find(
        (response: any) => response.applicantEmail === user?.email
      )
    ) {
      setCleared(false);
      window.alert("Error: You have already responded to this interview");
      router.push(`/applicant/summary/${props.interview.id}`);
      return () => {
        ignore = true;
      };
    }
    let res = validateLocalStorageTime(
      props.interview.interviewLength,
      `end_time_${props.interview.id}-${props.interview.interviewLength}`
    );
    switch (res) {
      case -1:
        setCleared(false);
        window.alert("Error: This interview has no time left");
        router.push(`/applicant/summary/${props.interview.id}`);
        return () => {
          ignore = true;
        };
      case 1:
        setCleared(false);
        let href =
          "/applicant/" +
          (props.interview.interviewType == "recorded"
            ? "videoInterview"
            : "writtenInterview") +
          "/" +
          props.interview.id;
        router.push(href);
        return () => {
          ignore = true;
        };
      default:
        break;
    }
    setCleared(true);
  }, [props.interview, user?.email]);

  if (!cleared) return <ResponsiveAppBar />;
  if (isLoading) return <div>Loading Auth0...</div>;
  if (loading) return <div>Loading DB...</div>;
  if (isError) return <h1>404 Error </h1>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <>
      <ResponsiveAppBar></ResponsiveAppBar>
      <InterviewDash interview={props.interview} user={data}></InterviewDash>
    </>
  );
}
