export default async function requestDeletePosition(id: number, email: string) {
  return await fetch(`/api/db/delete-position`, {
    method: "PUT",
    body: JSON.stringify({
      email: email,
      id: id,
    }),
  });
}
