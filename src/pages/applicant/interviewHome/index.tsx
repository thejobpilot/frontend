import {Inter} from '@next/font/google'
import NavBar from "@/components/navBar";
import SignIn from "@/components/signIn";
import SignUp from "@/components/signUp";
import ResponsiveAppBar from "@/components/navBar";
import aboutInterview from "@/components/interviewComponents/aboutInterview";
import InterviewBox from "@/components/interviewComponents/aboutInterview";
import VideoDisplay from "@/components/interviewComponents/videoBoxDisplayedForApplicantFromRecruiter";
import startInterviewButtion from "@/components/interviewComponents/startInterviewButtion";
import StartInterviewButton from "@/components/interviewComponents/startInterviewButtion";

const inter = Inter({subsets: ['latin']})

export default function RecruiterSignUp() {
    return (
        <>
            <div style={{ backgroundColor: "#EFEFEF", height: '100vh' }}>
                <ResponsiveAppBar></ResponsiveAppBar>
                <InterviewBox
                    position="Software Engineer"
                    about="ABOUT"
                    type="WRITTEN OR VIDEO"
                />
                <VideoDisplay></VideoDisplay>
                <StartInterviewButton></StartInterviewButton>
            </div>
        </>
    )
}

