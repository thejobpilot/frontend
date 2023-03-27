import {Inter} from '@next/font/google'
import NavBar from "@/components/navBar";
import SignIn from "@/components/signIn";
import SignUp from "@/components/signUp";
import ResponsiveAppBar from "@/components/navBar";
import aboutInterview from "@/components/aboutInterview";
import InterviewBox from "@/components/aboutInterview";
import VideoDisplay from "@/components/videoBoxDisplayedForApplicantFromRecruiter";

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
            </div>
        </>
    )
}

