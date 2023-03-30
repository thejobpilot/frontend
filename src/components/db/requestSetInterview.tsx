
export default async function requestSetInterview(interviewId: number, positonId: number, newInterview: any) {
  await fetch(`/api/db/set-interview?id=${interviewId}&positionId=${positonId}`, {
    body: JSON.stringify(newInterview),
    method: "PUT",
  });
}
