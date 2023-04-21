import { useUser } from "@auth0/nextjs-auth0/client";
import ResponsiveAppBar from "@/components/navBar";
import React from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import AccountDetails from "@/components/applicantDash/accountDetails";
import InterviewList from "@/components/applicantDash/interviewList";
import { withTitle } from "@/components/utils";
import useUserDB from "@/components/db/useUserDB";
import { useRouter } from "next/router";

export function Dashboard() {
  const router = useRouter();
  const { user, isLoading, error } = useUser();
  const {
    data,
    isLoading: isLoadingDB,
    isError,
  } = useUserDB(user ? user.email! : "");
  if (error) return <div>Failed to load</div>;
  if (isError) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  if (isLoadingDB) return <div>Loading...</div>;
  if (data.userType != "applicant") router.push(`/${data.userType}/dash`);
  return (
    user && (
        <div>
            <ResponsiveAppBar></ResponsiveAppBar>
            <InterviewList user={user}></InterviewList>
            <AccountDetails user={user}></AccountDetails>
        </div>
    )
  );
}

export const getServerSideProps = withPageAuthRequired();
export default withTitle("Applicant Dashboard")(Dashboard);
