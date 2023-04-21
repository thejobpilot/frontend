import { useUser } from "@auth0/nextjs-auth0/client";
import ResponsiveAppBar from "@/components/recruiterDash/navBarRecruiter";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import React from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import AccountDetails from "@/components/recruiterDash/accountDetails";
import useUserDB from "@/components/db/useUserDB";
import { withTitle } from "@/components/utils";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from '@mui/material/styles';


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

  const theme = createTheme({
    palette: {
      background: {
        default: '#FFF',
      },
    },
  });

  /* TODO: ENABLE THIS BEFORE FRIDAY TO PROTECT PATHS */
  if (data.userType != "recruiter") router.push(`/${data.userType}/dash`);

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
          </div>
          <Box sx={{ display: 'flex', justifyContent: 'center' , width: 835 }}>
            <AccountDetails user={user} />
          </Box>
        </div>
      </div>
    )
  );
}

export const getServerSideProps = withPageAuthRequired();

export default withTitle("Recruiter Dashboard")(Dashboard);
