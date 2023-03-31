import ResponsiveAppBar from "@/components/navBar";
import InterviewPage from "@/components/interviewComponents/interviewPage";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {useUser} from "@auth0/nextjs-auth0/client";
import useUserDB from "@/components/db/useUserDB";

export default function Written(props: any) {
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
            <InterviewPage
                user={data}
                interview={interview}
            ></InterviewPage>
        </>
    );
}

