import { useUser } from "@auth0/nextjs-auth0/client";
import ResponsiveAppBar from "@/components/navBar";
import Button from "@mui/material/Button";
import React, { Component } from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import accountDetails from "@/components/accountDetails";
import AccountDetails from "@/components/accountDetails";
import InterviewList from "@/components/interviewList";

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
            <InterviewList></InterviewList>
            <AccountDetails></AccountDetails>
        </div>
    )
  );
}

export const getServerSideProps = withPageAuthRequired();
