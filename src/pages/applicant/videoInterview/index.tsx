import {Inter} from '@next/font/google'
import NavBar from "@/components/navBar";
import SignIn from "@/components/signIn";
import SignUp from "@/components/signUp";
import ResponsiveAppBar from "@/components/navBar";
import Countdown from "@/components/interviewComponents/countdown";
import InterviewPage from "@/components/interviewComponents/interviewPage";
import Question from "@/components/interviewComponents/questions";
import RecordedInterviewPage from "@/components/interviewComponents/recordInterviewPage";


const inter = Inter({subsets: ['latin']})

export default function RecruiterSignUp() {
    return (
        <>
            <ResponsiveAppBar></ResponsiveAppBar>
            <RecordedInterviewPage></RecordedInterviewPage>

        </>
    )
}

