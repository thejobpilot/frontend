import {Inter} from '@next/font/google'
import NavBar from "@/components/navBar";
import SignIn from "@/components/signIn";
import SignUp from "@/components/signUp";
import ResponsiveAppBar from "@/components/navBar";
import Countdown from "@/components/interviewComponents/countdown";
import InterviewPage from "@/components/interviewComponents/interviewPage";
import Question from "@/components/interviewComponents/questions";
import InterviewDash from "@/components/behavioralInterview/interviewDash";
import useUserDB from "@/components/db/useUserDB";
import React, { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";



const inter = Inter({subsets: ['latin']})

export default function Behavioral(props: {interview: any}) {
    const [email, setEmail] = useState("");
    const { user, error, isLoading } = useUser();
    const { data, isError, isLoading: loading, mutate } = useUserDB(user?.email);
    if (isLoading) return <div>Loading Auth0...</div>;
    if (loading) return <div>Loading DB...</div>;
  
    if (isError) return <h1>404 Error </h1>;
    if (error) return <div>Error: {error.message}</div>;
    return (
        <>
            <ResponsiveAppBar></ResponsiveAppBar>
            <InterviewDash interview={props.interview} user={data}></InterviewDash>
        </>
       
    )
}

