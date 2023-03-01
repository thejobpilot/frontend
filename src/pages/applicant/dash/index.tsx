import { useUser } from "@auth0/nextjs-auth0/client";
import ResponsiveAppBar from "@/components/navBar";
import React, { Component } from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import AccountDetails from "@/components/accountDetails";
import InterviewList from "@/components/applicant-dash/interviewList";


export default function Dash() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

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
