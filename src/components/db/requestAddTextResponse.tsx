export default async function requestAddTextResponse(responseId: string, questionId: string, answer: string) {
  return await fetch(`/api/db/add-text-response?responseId=${responseId}&questionId=${questionId}`, {
    body: JSON.stringify({
      answer: answer
    }),
    method: "PUT",
  });
}
