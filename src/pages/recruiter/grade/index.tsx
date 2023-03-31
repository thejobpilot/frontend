import {useUser} from "@auth0/nextjs-auth0/client";
import ResponsiveAppBar from "@/components/navBar";
import React, {useEffect, useState} from "react";
import {withPageAuthRequired} from "@auth0/nextjs-auth0";
import PositionList from "@/components/recruiterDash/positionList";
import useUserDB from "@/components/db/useUserDB";
import {withTitle} from "@/components/utils";
import SmartCards from "@/components/recruiterReview/smartCards";
import {Box} from "@mui/material";
import ResponseReview from "@/components/recruiterDash/responseReview";
import useSearchUsers from "@/components/db/useSearchUsers";

export type SelectedInterview = { position: any; interview: any, response: null };

export function InterviewManager() {
    let initialState: SelectedInterview = {
        interview: null,
        position: null,
        response: null
    };
    const [selected, setSelected] = useState(initialState);

    const interviewSelector = (interview: any) => {
        setSelected((prev: any) => {
            return {...prev, interview: interview};
        })
        mutate()
    }

    const positionSelector = (position: any) => {
        setSelected((prev: any) => {
            return {...prev, position: position};
        })
        mutate();
    }

    const responseSelector = (response: any) => {
        setSelected((prev: any) => {
            return {...prev, response: response};
        })
        mutate();
    }

    const {user, error, isLoading} = useUser();
    let {data: allUsersData} = useSearchUsers()

    const {
        data: userData,
        isLoading: isLoadingDB,
        isError,
        mutate,
    } = useUserDB(user ? user.email! : "");

    useEffect(() => {
        document.body.style.backgroundColor = "#EFEFEF";
    }, []);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;
    return (
        user && (
            <div style={{backgroundColor: "#EFEFEF"}}>
                <ResponsiveAppBar/>
                <PositionList
                    user={user}
                    data={userData}
                    isLoading={isLoading}
                    isError={isError}
                    selected={selected}
                    positionSelector={positionSelector}
                    interviewSelector={interviewSelector}
                    responseSelector={responseSelector}
                />
                <Box
                    sx={{
                        p: 3,
                        position: "absolute",
                        top: 55,
                        right: "35%",
                        height: "100%",
                        width: "30%",
                    }}
                >
                    <SmartCards selected={selected} data={allUsersData} responseSelector={responseSelector}></SmartCards>
                </Box>
                <ResponseReview data={allUsersData} selected={selected}></ResponseReview>

            </div>
        )
    );
}

export const getServerSideProps = withPageAuthRequired();
export default withTitle("Interview Manager")(InterviewManager);
