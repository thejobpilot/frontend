export default async function requestSetUser(email: string, user: any) {
  await fetch(`/api/db/set-user?email=${email}`, {
    body: JSON.stringify(user),
    method: "PUT",
  });
}
