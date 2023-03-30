import React, {useEffect, useState} from "react";
import useAllUsers from "../db/useAllUsers";
import requestAssignInterview from "../db/requestAssignInterview";
import 'react-data-grid/lib/styles.css';
import DataGrid, {Column} from 'react-data-grid';
import {Box} from "@mui/system";

type TableItem = { rank: number; id: number; email: any };
export default function ApplicantList(props: any) {
    const users = useAllUsers();
    const defaultMap: TableItem[] = [];
    const [applicants, setApplicants] = useState(defaultMap);

    useEffect(() => {
        if (users) {
            let map: TableItem[] = users.map((user, index) => ({
                id: index,
                rank: index + 1,
                email: user,
            }));
            setApplicants(
                map
            );
        }
    }, [users]);


    if (!users) return <div>Failed to load</div>;

    const addToInterview = (selectedEmail: string) => {
        if (props.selected.interview !== -1) {
            requestAssignInterview(selectedEmail, props.selected.interview.id);
            window.alert("Successfully assigned interview!");
        } else {
            console.log("failed");
        }
    };

    const columns: Column<TableItem>[] = [
        {key: 'id', name: 'ID'},
        {key: 'email', name: 'Email', minWidth: 50}
    ];


    const rows = applicants.map((value, index) => {
        return {"index": index, "value": value.email};
    })

    console.log(rows);
    return (
        <Box
            sx={{
                p: 3,
                bgcolor: "white",
                color: "black",
                position: "absolute",
                top: 55,
                right: 0,
                height: "100%",
                width: "30%",
            }}>
            <DataGrid columns={columns} rows={applicants}/>
        </Box>
    );
}
