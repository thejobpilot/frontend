import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { SelectedInterview } from "@/pages/recruiter/grade";
import { getIdFromArray } from "../utils";

export type SmartCardEntry = {
  response: any;
  id: string;
  gpa: string;
  name: string;
  email: string;
  graduationYear: string;
};
interface SmartCardsProps {
  userData: any;
  selected: SelectedInterview;
  setResponse: any;
  data: any;
}

let initialApplicants: SmartCardEntry[] = [];

export default function SmartCards(props: SmartCardsProps) {
//   const [interview, setInterview] = useState<any>(null);
  const [applicants, setApplicants] = useState(initialApplicants);

  useEffect(() => {
    document.body.style.backgroundColor = "#EFEFEF";
    let positionCache = getIdFromArray(
      props.userData?.positions,
      props.selected?.positionId
    );
    let interviewCache = getIdFromArray(
      positionCache?.interviews,
      props.selected?.interviewId
    );
    // setInterview(interviewCache);
    let smartCards: SmartCardEntry[] = interviewCache?.responses.map(
        (response: any, index: number) => {
        let matchedUser = props.data?.find(
            (user: any) => user.email === response.applicantEmail
        );
        if (matchedUser) {
            let entry: SmartCardEntry = {
            gpa: matchedUser.gpa,
            graduationYear: matchedUser.graduationDate,
            name: matchedUser.fullName,
            email: matchedUser.email,
            id: index.toString(),
            response: response,
            };
            return entry;
        }
        return null;
        }
    );
    setApplicants(smartCards);
  }, [
    props.userData?.positions,
    props.selected.positionId,
    props.selected.interviewId,

  ]);

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
            {applicants?.map((applicant, index) => (
              <Draggable
                key={applicant.id}
                draggableId={applicant.id}
                index={index}
              >
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
                        Name: {applicant.name}
                      </Typography>
                      <Typography variant="body1" component="div">
                        Email: {applicant.email}
                      </Typography>
                      <Typography>
                        GPA: {applicant.gpa} | Graduation Year:{" "}
                        {applicant.graduationYear}
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
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => props.setResponse(applicant.response)}
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
}
