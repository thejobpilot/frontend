import {Inter} from '@next/font/google'
import NavBar from "@/components/navBar";
import SignIn from "@/components/signIn";
import SignUp from "@/components/signUp";
import ResponsiveAppBar from "@/components/navBar";
import InterviewDash from "@/components/behavioralInterview/interviewDash";

const inter = Inter({subsets: ['latin']})

export default function Behavioral() {
    return (
        <>
            <ResponsiveAppBar></ResponsiveAppBar>
            <InterviewDash></InterviewDash>
     
        </>
    )
}

