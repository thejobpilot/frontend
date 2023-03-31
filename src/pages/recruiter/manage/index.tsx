import { useUser } from "@auth0/nextjs-auth0/client";
import ResponsiveAppBar from "@/components/navBar";
import React, { useEffect, useState } from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import PositionList from "@/components/recruiterDash/positionList";
import ApplicantList from "@/components/recruiterDash/applicantList";
import InterviewEditor from "@/components/recruiterDash/interviewEditor";
import useUserDB from "@/components/db/useUserDB";
import { withTitle } from "@/components/utils";
import { Snackbar, Alert } from "@mui/material";

export function InterviewManager() {
  const [showSave, setShowSave] = React.useState(false);
  const [selected, setSelected] = useState({
    positionId: null,
    interviewId: null,
  });
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

  const setPositionId = (id: any) => {
    setSelected((prev: any) => {
      return { ...prev, positionId: id };
    });
    mutate();
  };
  const setInterviewId = (id: any) => {
    if (selected.interviewId === id) {
      setSelected((prev: any) => {
        return { ...prev, interviewId: null };
      });
    } else {
      setSelected((prev: any) => {
        return { ...prev, interviewId: id };
      });
    }
    mutate();
  };

  const toggleSnackbar = () => {
    setShowSave(true);
  };
  const closeSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setShowSave(false);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isLoadingDB) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (isError) return <div>{isError.message}</div>;
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
          setPositionId={setPositionId}
          setInterviewId={setInterviewId}
        />
        <InterviewEditor
          data={data}
          isLoading={isLoading}
          isError={isError}
          mutate={mutate}
          selected={selected}
          toggleSnackbar={toggleSnackbar}
          setPositionId={setPositionId}
          setInterviewId={setInterviewId}
        />
        <ApplicantList
          user={user}
          mutater={mutate}
          selected={selected}
          setSelected={setSelected}
        />
        <Snackbar
          open={showSave}
          autoHideDuration={3000}
          onClose={closeSnackbar}
        >
          <Alert
            onClose={closeSnackbar}
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Interview successfully saved!
          </Alert>
        </Snackbar>
      </div>
    )
  );
}

export const getServerSideProps = withPageAuthRequired();
export default withTitle("Interview Manager")(InterviewManager);
