import {Inter} from '@next/font/google'
import NavBar from "@/components/navBar";
import SignIn from "@/components/signIn";
import SignUp from "@/components/signUp";
import ResponsiveAppBar from "@/components/navBar";
import Countdown from "@/components/interviewComponents/countdown";
import InterviewPage from "@/components/interviewComponents/interviewPage";
import Question from "@/components/interviewComponents/questions";
import RecordedInterviewPage from "@/components/interviewComponents/recordInterviewPage";
import {useRouter} from "next/router";
import {useUser} from "@auth0/nextjs-auth0/client";
import {useEffect, useState} from "react";
import useUserDB from "@/components/db/useUserDB";


const inter = Inter({subsets: ['latin']})

export default function RecruiterSignUp() {
    const router = useRouter();
    const {id} = router.query;
    const {user, error, isLoading} = useUser();
    const [interview, setInterview] = useState<any>(null);

    const {
        data,
        isLoading: isLoadingDB,
        isError,
    } = useUserDB(user ? user.email! : "");
    console.log(id)
    useEffect(() => {
        if (data && data.interviews) {
            setInterview(data.interviews.find(interview => interview.id == id));
        }
    }, [data]);
    return (
        <>
            <ResponsiveAppBar></ResponsiveAppBar>
            <RecordedInterviewPage></RecordedInterviewPage>

        </>
    )
}
