export default async function requestNewResponse(
  interviewId: string,
  applicantEmail: string | null | undefined
) {
  if (!applicantEmail || !interviewId) return;

  const email: string = applicantEmail;
  return await fetch(
    `/api/db/new-response?interviewId=${interviewId}&applicantEmail=${encodeURIComponent(
      email
    )}`,
    {
      method: "PUT",
    }
  );
}
