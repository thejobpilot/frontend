import { useUser } from "@auth0/nextjs-auth0/client";
import ResponsiveAppBar from "@/components/navBar";
import React, { useEffect } from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import PositionList from "@/components/recruiterDash/positionList";
import ApplicantList from "@/components/recruiterDash/applicantList";
import InterviewEditor from "@/components/recruiterDash/interviewEditor";

export default function InterviewManager() {
  const { user, error, isLoading } = useUser();
  useEffect(() => {
    document.body.style.backgroundColor = "#EFEFEF";
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  return (
    user && (
      <div style={{ backgroundColor: "#EFEFEF" }}>
        <ResponsiveAppBar />
        <PositionList />
        <InterviewEditor />
        <ApplicantList />
      </div>
    )
  );
}

export const getServerSideProps = withPageAuthRequired();
