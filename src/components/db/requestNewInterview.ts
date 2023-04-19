export default async function requestNewInterview(
  name: string,
  positionId: number
) {
  return await fetch(`/api/db/create-interview`, {
    method: "PUT",
    body: JSON.stringify({
      name: name,
      positionId: positionId,
    }),
  });
}
