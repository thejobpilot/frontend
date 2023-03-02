import { useUser } from "@auth0/nextjs-auth0/client";
import ResponsiveAppBar from "@/components/navBar";
import React from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import AccountDetails from "@/components/applicantDash/accountDetails";
import RecruiterList from "@/components/manage-interviews/recruiterList";

export default function Profile() {
  const { user, isLoading, error } = useUser();
  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    user && (
      <div>
        <ResponsiveAppBar></ResponsiveAppBar>
        <RecruiterList></RecruiterList>
        <AccountDetails user={user}></AccountDetails>
      </div>
    )
  );
}

export const getServerSideProps = withPageAuthRequired();
