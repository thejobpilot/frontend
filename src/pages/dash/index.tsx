import { withAuth0, WithAuth0Props } from "@auth0/auth0-react";
import { useUser } from "@auth0/nextjs-auth0/client";

import ResponsiveAppBar from "@/components/navBar";
import React, { useEffect } from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export default function Profile() {
  useEffect(() => {
    window.location.replace("/applicant/dash");
  }, []);

  const { error, isLoading } = useUser();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return null;
}

export const getServerSideProps = withPageAuthRequired();
