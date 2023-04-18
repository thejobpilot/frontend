import { useUser } from "@auth0/nextjs-auth0/client";
import ResponsiveAppBar from "@/components/recruiterDash/navBarRecruiter";
import React, { useEffect, useState } from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import PositionList from "@/components/recruiterDash/positionList";
import useUserDB from "@/components/db/useUserDB";
import { withTitle } from "@/components/utils";
import SmartCards from "@/components/recruiterReview/smartCards";
import { Box } from "@mui/material";
import ResponseReview from "@/components/recruiterDash/responseReview";
import useSearchUsers from "@/components/db/useSearchUsers";

export type SelectedInterview = {
  positionId: any;
  interviewId: any;
  response: null;
};

export function GradeManager() {
  const [selected, setSelected] = useState({
    positionId: null,
    interviewId: null,
    response: null,
  });
  const { user, error, isLoading } = useUser();
  const {
    data: allUsersData,
    isError: errorAll,
    isLoading: loadingAll,
  } = useSearchUsers();
  const {
    data: userData,
    isLoading: isLoadingDB,
    isError,
    mutate,
  } = useUserDB(user ? user.email! : "");

  const setPositionId = (id: any) => {
    setSelected((prev: any) => {
      return { ...prev, positionId: id };
    });
    mutate();
  };
  const setInterviewId = (id: any) => {
    if (selected.interviewId === id) {
      setSelected((prev: any) => {
        return { ...prev, response: null, interviewId: null };
      });
    } else {
      setSelected((prev: any) => {
        return { ...prev, response: null, interviewId: id };
      });
    }
    mutate();
  };
  const setResponse = (response: any) => {
    setSelected((prev: any) => {
      return { ...prev, response: response };
    });
    mutate();
  };

  if (isLoading) return <div>Loading...</div>;
  if (isLoadingDB) return <div>Loading...</div>;
  if (loadingAll) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (isError) return <div>{isError.message}</div>;
  if (errorAll) return <div>{errorAll.message}</div>;
  return ((
      <div style={{ backgroundColor: "#EFEFEF" }}>
        <ResponsiveAppBar />
        <PositionList
          user={user}
          data={userData}
          isLoading={isLoading}
          isError={isError}
          selected={selected}
          setPositionId={setPositionId}
          setInterviewId={setInterviewId}
        />
        <Box
          sx={{
            p: 3,
            position: "absolute",
            top: 55,
            right: "35%",
            height: "100%",
            width: "30%",
          }}
        >
          <SmartCards
            selected={selected}
            userData={userData}  
            data={allUsersData}
            setResponse={setResponse}
          />
        </Box>
        <ResponseReview
          data={allUsersData}
          selected={selected}
        ></ResponseReview>
      </div>
    )
  );
}

export const getServerSideProps = withPageAuthRequired();
export default withTitle("Grade Manager")(GradeManager);
