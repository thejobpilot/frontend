export default async function requestSubmitTextInterview(interviewId: string, email: string) {
  return await fetch(`/api/db/submit-text-interview?interviewId=${interviewId}&email=${encodeURIComponent(email)}`, {
    method: "PUT",
  });
}
