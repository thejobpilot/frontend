export default async function requestDeleteResponse(
  applicantEmail: string | null | undefined,
  response: any
) {
  if (!applicantEmail || !response) return;

  const responseId = response.id;
  const interviewId = response.interviewId;
  const email: string = applicantEmail;

  return await fetch(
    `/api/db/delete-response?responseId=${responseId}&interviewId=${interviewId}&applicantEmail=${encodeURIComponent(
      email
    )}`,
    {
      method: "PUT",
    }
  );
}
