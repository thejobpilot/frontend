import { useUser } from "@auth0/nextjs-auth0/client";
import ResponsiveAppBar from "@/components/navBar";
import Button from "@mui/material/Button";
import React, { Component } from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

import interviewItemTest from "@/components/applicant-dash/interviewItemTest";

export default function Profile() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const items = interviewItemTest();
  return (
    user && (
      <div>
        <ResponsiveAppBar />

        <div>
          {user.picture && user.name && (
            <img src={user.picture} alt={user.name} />
          )}
          <h1>Applicant/Dash</h1>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            href="/api/auth/logout"
          >
            Sign Out
          </Button>
          {
            items.map(i => i)
          }
        </div>
      </div>
    )
  );
}

export const getServerSideProps = withPageAuthRequired();
