import React, {useEffect, useState} from "react";
import {Box, Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {SelectedInterview} from "@/pages/recruiter/grade";

export type SmartCardEntry = {
    response: any,
    id: string;
    gpa: string,
    name: string,
    graduationYear: string
};
let initialApplicants: SmartCardEntry[] = [];

const SmartCards = (props: { selected: SelectedInterview, responseSelector: any, data: any }) => {
    const [applicants, setApplicants] = useState(initialApplicants);
    useEffect(() => {
        if (props.selected.interview) {
            let smartCards: SmartCardEntry[] = props.selected.interview?.responses.map((response: any, index: number) => {
                let matchedUser = props.data.find((user: any) => user.email == response.applicantEmail);
                let entry: SmartCardEntry = {
                    gpa: matchedUser.gpa,
                    graduationYear: matchedUser.graduationDate,
                    name: matchedUser.fullName,
                    id: index.toString(),
                    response: response
                };
                return entry
            });
            setApplicants(smartCards);
        }
    }, [props.selected]);

    const onDragEnd = (result: any) => {
        if (!result.destination) return;

        const items = Array.from(applicants);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setApplicants(items);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="applicants">
                {(provided) => (
                    <Box
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            minHeight: "100vh",
                            width: "100%",
                        }}
                    >
                        {applicants.map((applicant, index) => (
                            <Draggable key={applicant.id} draggableId={applicant.id} index={index}>
                                {(provided) => (
                                    <Card
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        sx={{
                                            margin: 2,
                                            width: "100%",
                                        }}
                                    >
                                        <CardContent>
                                            <Typography variant="h6" component="div">
                                                {applicant.name}
                                            </Typography>
                                            <Typography>
                                                GPA: {applicant.gpa} | Graduation Year: {applicant.graduationYear}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    width: "100%",
                                                }}
                                            >
                                                <Button variant="contained" color="primary"
                                                        onClick={() => props.responseSelector(applicant.response)}
                                                >
                                                    Select
                                                </Button>
                                            </Box>
                                        </CardActions>
                                    </Card>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </Box>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default SmartCards;
