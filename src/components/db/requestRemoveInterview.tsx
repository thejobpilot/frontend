export default async function requestRemoveInterview(
  email: string,
  interviewId: number
) {
  await fetch(`/api/db/remove-interview`, {
    body: JSON.stringify({
      email: email,
      interviewId: interviewId,
    }),
    method: "DELETE",
  });
}
