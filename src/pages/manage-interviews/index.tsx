import { useUser } from "@auth0/nextjs-auth0/client";

import ResponsiveAppBar from "@/components/navBar";
import Button from "@mui/material/Button";
import React, { Component } from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";

export default function ManageInterviews() {
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;


  return (
    user && (
      <div>
        {user.picture && user.name && (
          <img src={user.picture} alt={user.name} />
        )}
        <h1>{router.asPath}</h1>
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


        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={()=>router.back()}
        >
          Go back
        </Button>
      </div>
    )
  );
}

export const getServerSideProps = withPageAuthRequired();
