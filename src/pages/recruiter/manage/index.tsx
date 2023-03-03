import { useUser } from "@auth0/nextjs-auth0/client";
import ResponsiveAppBar from "@/components/navBar";
import React from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import PositionList from "@/components/recruiterDash/positionList";
import ApplicantList from "@/components/recruiterDash/applicantList";

export default function InterviewManager() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    user && (
      <div style={{ backgroundColor: "#EFEFEF" }}>
        <ResponsiveAppBar></ResponsiveAppBar>
        <PositionList></PositionList>
        <ApplicantList></ApplicantList>
      </div>
    )
  );
}

export const getServerSideProps = withPageAuthRequired();
