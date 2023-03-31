export default async function requestChangeQuestion(questionId: string, interviewId: string, prompt: string) {
  await fetch(`/api/db/change-question?questionId=${questionId}&interviewId=${interviewId}`, {
    body: JSON.stringify({
      prompt: prompt
    }),
    method: "PUT",
  });
}
