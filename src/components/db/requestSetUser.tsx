import { User } from "gen/api";

export default async function requestSetUser(email: string, user: User) {
  await fetch(`/api/db/set-user?email=${email}`, {
    body: JSON.stringify(user),
    method: "PUT",
  });
}
