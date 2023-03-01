import { withAuth0, WithAuth0Props } from "@auth0/auth0-react";
import { useUser } from "@auth0/nextjs-auth0/client";
import ResponsiveAppBar from "@/components/navBar";
import Button from "@mui/material/Button";
import React, { Component } from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import AccountDetailsRecruiter from "@/components/accountDetailsRecruiter";

export default function Profile() {
    const { user, error, isLoading } = useUser();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;

    return (
        user && (
            <div style={{ backgroundColor: "#EFEFEF" }}>
                <ResponsiveAppBar></ResponsiveAppBar>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', height: '100vh' }}>
                    <div style={{ backgroundColor: 'transparent', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <Button style={{ backgroundColor: '#111E31', color: 'white', margin: '25px', padding: '25px 50px', borderRadius: 16}} variant="contained">Manage Interviews</Button>
                        <Button style={{ backgroundColor: '#111E31', color: 'white', margin: '25px', padding: '25px 50px', borderRadius: 16}} variant="contained">Review Applicants</Button>
                    </div>
                    <div style={{ flexGrow: 1 }}>
                        <AccountDetailsRecruiter></AccountDetailsRecruiter>
                    </div>
                </div>
            </div>
        )
    );
}

export const getServerSideProps = withPageAuthRequired();
