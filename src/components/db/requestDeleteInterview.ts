export default async function requestDeleteInterview(
  id: number,
  positionId: number
) {
  return await fetch(`/api/db/delete-interview`, {
    method: "PUT",
    body: JSON.stringify({
      id: id,
      positionId: positionId,
    }),
  });
}
