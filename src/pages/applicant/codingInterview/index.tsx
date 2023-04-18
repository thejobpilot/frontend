// import { useUser } from "@auth0/nextjs-auth0/client";
// import { withPageAuthRequired } from "@auth0/nextjs-auth0";
// import { useRouter } from "next/router";
// import useUserDB from "@/components/db/useUserDB";
// import { useEffect, useState } from "react";
// import { Alert, AlertTitle } from "@mui/material";
// import { Container } from "@mui/system";
// import Forbidden from "@/components/forbidden";
// import { withTitle } from "@/components/utils";
// import Behavioral from "@/pages/applicant/interviewDash";
// import CodingInterviewPage from "@/components/interviewComponents/codingInterview";
// import ResponsiveAppBar from "@/components/navBar";
//
// function userHasInterviewID(user: any, id: any, updater: any) {
//     if (!user) {
//         updater(null);
//         return;
//     }
//     id! = parseInt(id);
//     for (const i in user.interviews) {
//         if (user.interviews[i].id === id) {
//             updater(user.interviews[i]);
//             return;
//         }
//     }
//     updater(null);
// }
//
// export function Interview() {
//     const router = useRouter();
//     const { id } = router.query;
//     const [interview, setInterview] = useState<any>(null);
//     const { user, error, isLoading } = useUser();
//
//     const {
//         data,
//         isLoading: isLoadingDB,
//         isError,
//     } = useUserDB(user ? user.email! : "");
//     useEffect(() => {
//         userHasInterviewID(data, id, setInterview);
//     }, [data, id]);
//
//     if (isLoading) return <div>Loading...</div>;
//     if (error) return <div>{error.message}</div>;
//     if (isLoadingDB) return <div>Loading...</div>;
//     if (isError) return <div>{isError.message}</div>;
//
//     if (interview === null)
//         return <Forbidden message="You do not have access to this interview" />;
//
//     return (
//         interview && (
//             <>
//                 <ResponsiveAppBar></ResponsiveAppBar>
//                 <CodingInterviewPage></CodingInterviewPage>
//             </>
//         )
//     );
// }
//
// export const getServerSideProps = withPageAuthRequired();
// export default withTitle("Interview Assistant")(Interview);

import {Inter} from '@next/font/google'
import SignIn from "@/components/signIn";
import ResponsiveAppBar from "@/components/navBar";
import Router from 'next/router';
import { useUser } from '@auth0/nextjs-auth0/client';
import CodingInterviewPage from "@/components/interviewComponents/codingInterview";

const inter = Inter({subsets: ['latin']})

export default function Home() {

    return (
        <>
            <ResponsiveAppBar></ResponsiveAppBar>
            <CodingInterviewPage></CodingInterviewPage>
        </>
    );
}