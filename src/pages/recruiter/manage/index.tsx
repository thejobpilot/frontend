import { withAuth0, WithAuth0Props } from "@auth0/auth0-react";
import { useUser } from "@auth0/nextjs-auth0/client";

import ResponsiveAppBar from "@/components/navBar";
import Button from "@mui/material/Button";
import React, { Component } from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import PositionList from "@/components/positionList";
import ApplicantList from "@/components/applicantList";

export default function Profile() {
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
