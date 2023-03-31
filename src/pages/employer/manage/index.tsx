import {useUser} from "@auth0/nextjs-auth0/client";
import ResponsiveAppBar from "@/components/navBar";
import React, {useEffect, useState} from "react";
import {withPageAuthRequired} from "@auth0/nextjs-auth0";
import PositionList from "@/components/recruiterDash/positionList";
import ApplicantList from "@/components/recruiterDash/applicantList";
import InterviewEditor from "@/components/recruiterDash/interviewEditor";

export default function InterviewManager() {
    const [selected, setSelected] = useState({
        interview: null,
        position: null,
    });

    const interviewSelector = (id: any) => {
        setSelected((prev: any) => {
            return {...prev, interview: id};
        })
    }

    const positionSelector = (id: any) => {
        setSelected((prev: any) => {
            return {...prev, position: id};
        })
    }

    const {user, error, isLoading} = useUser();

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
                    selected={selected}
                    positionSelector={positionSelector}
                    interviewSelector={interviewSelector}
                />
                <InterviewEditor
                    user={user}
                    selected={selected}
                    setSelected={setSelected}
                />
                <ApplicantList
                    user={user}
                    selected={selected}
                    setSelected={setSelected}
                />
            </div>
        )
    );
}

export const getServerSideProps = withPageAuthRequired();
