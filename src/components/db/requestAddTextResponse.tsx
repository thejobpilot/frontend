export default async function requestAddTextResponse(responseId: string, questionId: string, answer: string) {
  return await fetch(`/api/db/add-text-response?responseId=${responseId}&questionId=${questionId}&answer=${encodeURIComponent(answer)}`, {
    method: "PUT",
  });
}
