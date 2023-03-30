import React, {useState} from "react";
import {Box, Card, CardContent, Typography} from "@mui/material";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";

const initialApplicants = [
    {
        id: "1",
        name: "John Doe",
        gpa: 3.7,
        graduationYear: 2022,
    },
    {
        id: "2",
        name: "Jane Smith",
        gpa: 3.9,
        graduationYear: 2021,
    },
    {
        id: "3",
        name: "Bob Johnson",
        gpa: 3.5,
        graduationYear: 2023,
    },
];

const SmartCards = () => {
    const [applicants, setApplicants] = useState(initialApplicants);

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
                                            width: "30%",
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
