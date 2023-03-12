import {Inter} from '@next/font/google'
import NavBar from "@/components/navBar";
import SignIn from "@/components/signIn";
import SignUp from "@/components/signUp";
import ResponsiveAppBar from "@/components/navBar";
import Dash from "@/components/behavioralInterview/interviewDash";

const inter = Inter({subsets: ['latin']})

export default function RecruiterSignUp() {
    return (
        <>
            <ResponsiveAppBar></ResponsiveAppBar>
            <SignUp name = "Applicant"></SignUp>
            <Dash></Dash>
        </>
    )
}

