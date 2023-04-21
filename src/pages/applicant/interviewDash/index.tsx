import { Inter } from "@next/font/google";
import ResponsiveAppBar from "@/components/navBar";
import InterviewDash from "@/components/behavioralInterview/interviewDash";
import useUserDB from "@/components/db/useUserDB";
import React, { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/router";
import { getInterviewState, InterviewState } from "@/components/utils";
import requestStartResponse from "@/components/db/requestStartResponse";

const inter = Inter({ subsets: ["latin"] });

export default function Behavioral({ interview }: any) {
  const [cleared, setCleared] = useState(false);
  const router = useRouter();
  const [response, setResponse] = useState<any>(null);
  const { user, error, isLoading } = useUser();
  const { data, isError, isLoading: loading, mutate } = useUserDB(user?.email);

  const handleStart = async (e: any) => {
    e.preventDefault();
    await requestStartResponse(
      response.id,
      interview.id,
      user?.email,
      interview.interviewLength
    );
    let href: string;
    if (interview.interviewType === "recorded") {
      href = "/applicant/" + "videoInterview" + "/" + interview.id;
    } else if (interview.interviewType === "coding") {
      href = "/applicant/" + "codingInterview" + "/" + interview.id;
    } else {
      href = "/applicant/" + "writtenInterview" + "/" + interview.id;
    }
    router.push(href);
  };

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
        let href: string;
        if (interview.interviewType == "recorded") {
          href = "/applicant/" + "videoInterview" + "/" + interview.id;
        } else if (interview.interviewType == "coding") {
          href = "/applicant/" + "codingInterview" + "/" + interview.id;
        } else {
          href = "/applicant/" + "writtenInterview" + "/" + interview.id;
        }
        router.push(href);
        return () => {
          ignore = true;
        };
      default:
        break;
    }

    setCleared(true);
  }, [interview, response]);

  if (!cleared) return <ResponsiveAppBar />;
  if (isLoading) return <div>Loading Auth0...</div>;
  if (loading) return <div>Loading DB...</div>;
  if (isError) return <h1>404 Error </h1>;
  if (error) return <div>Error: {error.message}</div>;
  console.log("response", response);
  console.log("interview", interview);
  return (
    <>
      <ResponsiveAppBar></ResponsiveAppBar>
      <InterviewDash
        handleStart={handleStart}
        interview={interview}
        user={data}
      ></InterviewDash>
    </>
  );
}
