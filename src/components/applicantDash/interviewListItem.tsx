import { getInterviewState, InterviewState } from "../utils";
import { CheckCircleOutline, PendingActions, Sync } from "@mui/icons-material";
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

export default function InterviewListItem(props: any) {
  let router = useRouter();
  let path = "/";
  let icon = null;
  const [response, setResponse] = useState<any>(null);
  const { user } = useUser();

  const newResponse = async (id: string, email: string) => {
    await requestNewResponse(id, email);
    await props.mutate();
  };

  useEffect(() => {
    if (props.interview) {
      setResponse(
        props.interview.responses?.find(
          (res: any) => res?.applicantEmail === user?.email
        )
      );
    }
  }, [props.interview]);

  let state = getInterviewState(response);
  switch (state) {
    case InterviewState.BAD_STATE:
      if (
        props.interview &&
        props.interview.responses &&
        user?.email &&
        !props.interview.responses?.find(
          (res: any) => res?.applicantEmail === user?.email
        )
      ) {
        newResponse(props.interview.id, user?.email);
      }
      icon = <Sync color="primary" />;
      break;
    case InterviewState.FINISHED:
      path = `/applicant/summary/${props.interview.id}`;
      icon = <CheckCircleOutline color="success" />;
      break;
    case InterviewState.IN_PROGRESS:
      if (props.interview.interviewType == "recorded") {
        path = "/applicant/" + "videoInterview" + "/" + props.interview.id;
      } else if (props.interview.interviewType == "coding") {
        path = "/applicant/" + "codingInterview" + "/" + props.interview.id;
      } else {
        path = "/applicant/" + "writtenInterview" + "/" + props.interview.id;
      }
      icon = <PendingActions color="warning" />;
      break;
    default:
      if (props.interview.interviewType == "coding") {
        path = "/applicant/" + "codingInterview" + "/" + props.interview.id;
      } else {
        path = "/interview/" + props.interview.id;
      }
      break;
  }
  if (props.interview.questions.length === 0) {
    return <div key={props.interview.id}></div>;
  }

  return (
    <ListItemButton
      key={props.interview.id}
      onClick={() => router.push(path)}
      sx={{
        borderBottom: "1px solid #E0E0E0",
      }}
    >
      <ListItemText
        primary={`${props.interview.companyName}: ${props.interview.name}`}
      />
      <ListItemSecondaryAction>
        {icon && <IconButton disabled>{icon}</IconButton>}
      </ListItemSecondaryAction>
    </ListItemButton>
  );
}
