import {Interview, User} from "jobpilot-backend";

export default async function requestSetInterview(interviewId: number, positonId: number, newInterview: Interview) {
  console.log(newInterview)
  await fetch(`/api/db/set-interview?id=${interviewId}&positionId=${positonId}`, {
    body: JSON.stringify(newInterview),
    method: "PUT",
  });
}
