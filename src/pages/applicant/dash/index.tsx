import { useUser } from "@auth0/nextjs-auth0/client";
import ResponsiveAppBar from "@/components/navBar";
import Button from "@mui/material/Button";
import React, { Component, useEffect, useState } from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import accountDetails from "@/components/accountDetails";
import AccountDetails from "@/components/accountDetails";
import InterviewList from "@/components/interviewList";

import interviewItemTest from "@/components/applicant-dash/interviewItemTest";
import { User, UsersApi, UserUserTypeEnum } from "gen/api";
import { Configuration } from "gen/api/configuration";

import useSWR from "swr";

const fetcher = (url: RequestInfo | URL) =>
  fetch(url).then((res) => res.json());

export default function Profile() {
  const { user } = useUser();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function updateUser(email, username) {
    const { data, error, isLoading } = useSWR(`/api/update-user?email=${email}&username=${username}`, fetcher);
    setData(data);
    setError(error);
    setIsLoading(isLoading);
  }

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    user && (
        <div>
            <ResponsiveAppBar></ResponsiveAppBar>
            <InterviewList user={user}></InterviewList>
            <AccountDetails user={user}></AccountDetails>
            <h1>{user.email}</h1>
        </div>
    )
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const items = interviewItemTest();
  return (
    user && (
        <div>
            <ResponsiveAppBar></ResponsiveAppBar>
            <InterviewList></InterviewList>
            <AccountDetails></AccountDetails>
            <h1>{apiUser.email}</h1>
        </div>
    )
  );
}

export const getServerSideProps = withPageAuthRequired();
