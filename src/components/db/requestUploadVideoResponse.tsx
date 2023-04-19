export default async function requestUploadVideoResponse(
  responseId: string,
  questionId: string,
  blob: Blob
) {
  const formData = new FormData();
  formData.append("video", blob);
  return await fetch(
    `/api/db/add-video-response?responseId=${responseId}&questionId=${questionId}`,
    {
      method: "PUT",
      body: formData,
    }
  );
}
