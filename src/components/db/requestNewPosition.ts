export default async function requestNewPosition(name: string, email: string) {
  return await fetch(`/api/db/create-position`, {
    method: "PUT",
    body: JSON.stringify({
      email: email,
      name: name,
    }),
  });
}
