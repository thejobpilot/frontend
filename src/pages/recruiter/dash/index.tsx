import { useUser } from "@auth0/nextjs-auth0/client";
import ResponsiveAppBar from "@/components/navBar";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import React from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import AccountDetails from "@/components/recruiterDash/accountDetails";
import useUserDB from "@/components/db/useUserDB";
import { withTitle } from "@/components/utils";

export function Dashboard() {
  const router = useRouter();

  const { user, error, isLoading } = useUser();
  const {
    data,
    isLoading: isLoadingDB,
    isError,
  } = useUserDB(user ? user.email! : "");
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (isLoadingDB) return <div>Loading...</div>;
  if (isError) return <div>{isError.message}</div>;

  /* TODO: ENABLE THIS BEFORE FRIDAY TO PROTECT PATHS */
//  if (data.userType != "recruiter") router.push(`/${data.userType}/dash`);

  return (
    user && (
      <div style={{ backgroundColor: "#EFEFEF" }}>
        <ResponsiveAppBar />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <div
            style={{
              backgroundColor: "transparent",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              style={{
                backgroundColor: "#111E31",
                color: "white",
                margin: "25px",
                padding: "25px 50px",
                borderRadius: 9,
              }}
              variant="contained"
              href="/recruiter/manage"
            >
              Manage Interviews
            </Button>
            <Button
                style={{
                    backgroundColor: "#111E31",
                    color: "white",
                    margin: "25px",
                    padding: "25px 50px",
                    borderRadius: 9,
                }}
              variant="contained"
              href="/recruiter/grade"
            >
              Review Applicants
            </Button>
          </div>
          <div style={{ flexGrow: 1 }}>
            <AccountDetails user={user} />
          </div>
        </div>
      </div>
    )
  );
}

export const getServerSideProps = withPageAuthRequired();


export default withTitle("Recruiter Dashboard")(Dashboard);