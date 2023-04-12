export default async function requestCreateQuestion(interviewId: string) {
  return await fetch(`/api/db/create-question?interviewId=${interviewId}`, {
    method: "PUT",
  });
}
