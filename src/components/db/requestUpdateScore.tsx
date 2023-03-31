export default async function requestUpdateScore(email: string, interviewId: string, responseId: string, score: string) {
  await fetch(`/api/db/update-response?email=${email}&interviewId=${interviewId}&responseId=${responseId}&score=${score}`, {
    method: "PUT",
  });
}
