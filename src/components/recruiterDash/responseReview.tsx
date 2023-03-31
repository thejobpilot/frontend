import React, {useEffect} from "react";
import {Box, Button, List, ListItem, ListItemText, Typography,} from "@mui/material";
import useSearchUsers from "@/components/db/useSearchUsers";
import requestSetUser from "@/components/db/requestSendEmailResponse";

export default function ResponseReview(props: { selected: any, data: any }) {
    // let {data} = useSearchUsers()
    let responseData: any = null;
    console.log(props.selected.response);
    // useEffect(() => {
    // }, [props.selected.response])
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
            }}
        >
            <Typography
                variant="h5"
                sx={{
                    bgcolor: "#111E31",
                    color: "white",
                    p: 2,
                    textAlign: "center",
                }}
            >
                Response Review
            </Typography>
            {props.selected.response && (
                <>
                    <Box sx={{display: "flex", justifyContent: "space-around", my: 2}}>
                        <Button
                            variant="contained"
                            sx={{bgcolor: "green", color: "white"}}
                            onClick={() => requestSetUser(props.selected.response.applicantEmail, true)}
                        >
                            Accept
                        </Button>
                        <Button
                            variant="contained"
                            sx={{bgcolor: "red", color: "white"}}
                            onClick={() => requestSetUser(props.selected.response.applicantEmail, false)}
                        >
                            Denied
                        </Button>
                    </Box>
                    <List>
                        {props.selected.response.textAnswers.map((answer: any, index: any) => (
                            <ListItem key={index}>
                                <ListItemText
                                    primary={`Question ${index + 1}: ${answer.answer}`}
                                />
                            </ListItem>
                        ))}
                    </List>
                </>
            )}
        </Box>
    );
}
