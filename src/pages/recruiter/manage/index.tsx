import { useUser } from "@auth0/nextjs-auth0/client";
import ResponsiveAppBar from "@/components/navBar";
import React, { useEffect, useState } from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import PositionList from "@/components/recruiterDash/positionList";
import ApplicantList from "@/components/recruiterDash/applicantList";
import InterviewEditor from "@/components/recruiterDash/interviewEditor";
import { Interview, Position } from "jobpilot-backend";
import useUserDB from "@/components/db/useUserDB";

export default function InterviewManager() {
  const [selected, setSelected] = useState({
    interview: null,
    position: null,
  });

  const interviewSelector = (id: Interview) => {
    setSelected((prev: any) => {
        return { ...prev, interview: id };
    })
    mutate()
  }

  const positionSelector = (id: Position) => {
    setSelected((prev: any) => {
        return { ...prev, position: id };
    })
    mutate();
  }

  const { user, error, isLoading } = useUser();
  const {
    data,
    isLoading: isLoadingDB,
    isError,
    mutate,
  } = useUserDB(user ? user.email! : "");

  useEffect(() => {
    document.body.style.backgroundColor = "#EFEFEF";
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  return (
    user && (
      <div style={{ backgroundColor: "#EFEFEF" }}>
        <ResponsiveAppBar />

        <PositionList
          user={user}
          data={data}
          isLoading={isLoading}
          isError={isError}
          selected={selected}
          positionSelector={positionSelector}
          interviewSelector={interviewSelector}
        />
        <InterviewEditor
          data={data}
          isLoading={isLoading}
          isError={isError}
          mutate={mutate}
          selected={selected}
          setInterview={interviewSelector}
          setPosition={positionSelector}
        />
        <ApplicantList
          user={user}
          selected={selected}
          setSelected={setSelected}
        />
      </div>
    )
  );
}

export const getServerSideProps = withPageAuthRequired();
