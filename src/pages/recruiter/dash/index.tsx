import { withAuth0, WithAuth0Props } from "@auth0/auth0-react";
import { useUser } from "@auth0/nextjs-auth0/client";

import ResponsiveAppBar from "@/components/navBar";
import Button from "@mui/material/Button";
import React, { Component } from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export default function Profile() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    user && (
      <div>
        {user.picture && user.name && (
          <img src={user.picture} alt={user.name} />
        )}
        <h1>Recruiter/Dash</h1>
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

        <div style={{ margin: "100px" }}></div>
        <div style={{ margin: "auto" }}>
          <Button fullWidth variant="contained" href="../../manage-interviews">
            Manage Interviews
          </Button>
        </div>
        <div style={{ margin: "100px" }}></div>
        <div style={{ margin: "auto" }}>
          <Button fullWidth variant="contained" href="../../review-applicants">
            Review Applicants
          </Button>
        </div>
      </div>
    )
  );
}

export const getServerSideProps = withPageAuthRequired();
