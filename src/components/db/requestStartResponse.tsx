export default async function requestStartResponse(
  responseId: string,
  interviewId: string,
  applicantEmail: string | null | undefined,
  lengthMinutes: number
) {
  if (!applicantEmail || !interviewId) return;

  const startTime = new Date();
  const endTime = new Date(startTime.getTime());
  endTime.setUTCMinutes(endTime.getUTCMinutes() + lengthMinutes);

  console.log("Starting interview: ")
  console.log("start: ", startTime)
  console.log("end: ", endTime)
  const email: string = applicantEmail;
  return await fetch(
    `/api/db/start-response?responseId=${responseId}&interviewId=${interviewId}&applicantEmail=${encodeURIComponent(
      email
    )}&startTime=${Math.floor(startTime.getTime() / 1000)}&endTime=${Math.floor(
      endTime.getTime() / 1000
    )}`,
    {
      method: "PUT",
    }
  );
}
