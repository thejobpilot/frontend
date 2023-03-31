export default async function requestDeleteQuestion(questionId: string, interviewId: string) {
  await fetch(`/api/db/delete-question?questionId=${questionId}&interviewId=${interviewId}`, {
    method: "PUT",
  });
}
