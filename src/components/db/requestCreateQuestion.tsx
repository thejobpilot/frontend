export default async function requestCreateQuestion(interviewId: string) {
  await fetch(`/api/db/create-question?interviewId=${interviewId}`, {
    method: "PUT",
  });
}
