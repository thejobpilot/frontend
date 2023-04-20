export default async function requestEndResponse(
  applicantEmail: string | null | undefined,
  response: any
) {
  if (!applicantEmail || !response) return;

  const startTime = response.startTime;
  const endTime = Math.floor(Date.now() / 1000);
  const responseId = response.id;
  const interviewId = response.interviewId;
  const email: string = applicantEmail;

  console.log("Finishing interview: ")
  console.log("start: ", startTime)
  console.log("end: ", endTime)
  return await fetch(
    `/api/db/end-response?responseId=${responseId}&interviewId=${interviewId}&applicantEmail=${encodeURIComponent(
      email
    )}&startTime=${startTime}&endTime=${endTime}`,
    {
      method: "PUT",
    }
  );
}
