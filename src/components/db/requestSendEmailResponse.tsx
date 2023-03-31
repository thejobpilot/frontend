export default async function requestSetUser(email: string, acceptance: any) {
  await fetch(`/api/db/send-response-email?email=${email}&accepted=${acceptance ? "true" : "false"}`, {
    method: "PUT",
  });
}
