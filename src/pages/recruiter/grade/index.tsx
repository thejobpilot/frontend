import {useUser} from "@auth0/nextjs-auth0/client";
import ResponsiveAppBar from "@/components/navBar";
import React, {useEffect, useState} from "react";
import {withPageAuthRequired} from "@auth0/nextjs-auth0";
import PositionList from "@/components/recruiterDash/positionList";
import useUserDB from "@/components/db/useUserDB";
import {withTitle} from "@/components/utils";
import SmartCards from "@/components/recruiterReview/smartCards";

export type SelectedInterview = { position: any; interview: any };

export function InterviewManager() {
    let initialState: SelectedInterview = {
        interview: null,
        position: null,
    };
    const [selected, setSelected] = useState(initialState);

    const interviewSelector = (id: any) => {
        setSelected((prev: any) => {
            return {...prev, interview: id};
        })
        mutate()
    }

    const positionSelector = (id: any) => {
        setSelected((prev: any) => {
            return {...prev, position: id};
        })
        mutate();
    }

    const {user, error, isLoading} = useUser();
    const {
        data,
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
                    data={data}
                    isLoading={isLoading}
                    isError={isError}
                    selected={selected}
                    positionSelector={positionSelector}
                    interviewSelector={interviewSelector}
                />
                <SmartCards selected={selected}></SmartCards>
            </div>
        )
    );
}

export const getServerSideProps = withPageAuthRequired();
export default withTitle("Interview Manager")(InterviewManager);
