import { useUser } from "@auth0/nextjs-auth0/client";
import ResponsiveAppBar from "@/components/navBar";
import Button from "@mui/material/Button";
import React, { Component } from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import AccountDetails from "@/components/employerAccountDetails";
import RecruiterList from "@/components/recruiterList";

import interviewItemTest from "@/components/applicant-dash/interviewItemTest";

export default function Profile() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const items = interviewItemTest();
  return (
    user && (
        <div>
            <ResponsiveAppBar></ResponsiveAppBar>
            <RecruiterList></RecruiterList>
            <AccountDetails></AccountDetails>
        </div>
    )
  );
}

export const getServerSideProps = withPageAuthRequired();
