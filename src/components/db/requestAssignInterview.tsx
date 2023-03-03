import { User } from "jobpilot-backend";

export default async function requestAssignInterview(email: string, interviewId: number) {
  await fetch(`/api/db/assign-interview`, {
    body: JSON.stringify({
      email: email,
      interviewId: interviewId
    }),
    method: "PUT",
  });
}
