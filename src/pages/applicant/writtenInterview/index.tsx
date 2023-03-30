import {Inter} from '@next/font/google'
import NavBar from "@/components/navBar";
import SignIn from "@/components/signIn";
import SignUp from "@/components/signUp";
import ResponsiveAppBar from "@/components/navBar";
import Countdown from "@/components/interviewComponents/countdown";
import InterviewPage from "@/components/interviewComponents/interviewPage";
import Question from "@/components/interviewComponents/questions";
import InterviewDash from "@/components/behavioralInterview/interviewDash";

export default function Written() {
    return (
        <>
            <ResponsiveAppBar></ResponsiveAppBar>
            <InterviewPage></InterviewPage>
        </>
    )
}

