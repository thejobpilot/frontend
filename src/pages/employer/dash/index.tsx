import { useUser } from "@auth0/nextjs-auth0/client";
import ResponsiveAppBar from "@/components/navBar";
import Button from "@mui/material/Button";
import React from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import AccountDetails from "@/components/recruiterDash/accountDetails";

export default function Dashboard() {
  const { user, error, isLoading } = useUser();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

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
              href="/employer/manage"
            >
              Manage Interviews
            </Button>
            <Button
              style={{
                backgroundColor: "#111E31",
                color: "white",
                opacity: "60%",
                margin: "25px",
                padding: "25px 50px",
                borderRadius: 9,
              }}
              disabled
              variant="contained"
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
