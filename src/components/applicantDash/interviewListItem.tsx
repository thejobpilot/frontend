import { InterviewState, getInterviewState } from "../utils";
import { CheckCircleOutline, Sync, PendingActions } from "@mui/icons-material";
import {
  IconButton,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import requestNewResponse from "../db/requestNewResponse";

export default function InterviewListItem({ interview }: any) {
  let router = useRouter();
  let path = "/";
  let icon = null;
  const [response, setResponse] = useState<any>(null);
  const { user } = useUser();

  useEffect(() => {
    if (interview) {
      setResponse(
        interview.responses?.find(
          (res: any) => res?.applicantEmail === user?.email
        )
      );
    }
  }, [interview]);

  let state = getInterviewState(response);
  switch (state) {
    case InterviewState.BAD_STATE:
      if (
        interview &&
        interview.responses &&
        user?.email &&
        !interview.responses?.find(
          (res: any) => res?.applicantEmail === user?.email
        )
      ) {
        requestNewResponse(interview.id, user?.email);
      }
      icon = <Sync color="primary" />;
      break;
    case InterviewState.FINISHED:
      path = `/applicant/summary/${interview.id}`;
      icon = <CheckCircleOutline color="success" />;
      break;
    case InterviewState.IN_PROGRESS:
      path =
        "/applicant/" +
        (interview.interviewType == "recorded"
          ? "videoInterview"
          : "writtenInterview") +
        "/" +
        interview.id;
      icon = <PendingActions color="warning" />;
      break;
    default:
      path = "/interview/" + interview.id;
      break;
  }

  if (interview.questions.length === 0) {
    return <div key={interview.id}></div>;
  }

  return (
    <ListItemButton
      key={interview.id}
      onClick={() => router.push(path)}
      sx={{
        borderBottom: "1px solid #E0E0E0",
      }}
    >
      <ListItemText primary={`${interview.companyName}: ${interview.name}`} />
      <ListItemSecondaryAction>
        {icon && <IconButton disabled>{icon}</IconButton>}
      </ListItemSecondaryAction>
    </ListItemButton>
  );
}
