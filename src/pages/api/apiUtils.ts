import { NextApiResponse } from "next";
import { ApiErrorResponse, ApiOkResponse } from "apisauce";

export default function handleBackendResponse(
  nextjsResponse: NextApiResponse,
  backendResponse: ApiErrorResponse<unknown> | ApiOkResponse<unknown>
) {
  if (backendResponse.ok) {
    nextjsResponse.status(200).send(backendResponse.data);
  } else {
    console.log("Backend Error: ", backendResponse?.data);
    nextjsResponse
      .status(500)
      .send(`Backend error: ${JSON.stringify(backendResponse?.data)}`);
  }
}
