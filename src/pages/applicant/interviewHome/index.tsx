import {Inter} from '@next/font/google'
import ResponsiveAppBar from "@/components/navBar";
import InterviewBox from "@/components/interviewComponents/aboutInterview";
import VideoDisplay from "@/components/interviewComponents/videoBoxDisplayedForApplicantFromRecruiter";
import StartInterviewButton from "@/components/interviewComponents/startInterviewButtion";

const inter = Inter({subsets: ['latin']})

export default function RecruiterSignUp() {
    return (
        <>
            <div style={{backgroundColor: "#EFEFEF", height: '100vh'}}>
                <ResponsiveAppBar></ResponsiveAppBar>
                <InterviewBox position="Software Engineer"
                              about="ABOUT"
                              type="WRITTEN OR VIDEO"></InterviewBox>
                <VideoDisplay></VideoDisplay>
                <StartInterviewButton></StartInterviewButton>
            </div>
        </>
    )
}

