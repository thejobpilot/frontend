import { NextApiRequest, NextApiResponse } from "next";
import api from "@/utils/utils";
import { ApiErrorResponse, ApiOkResponse } from "apisauce";

export default async function removeInterview(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let body = JSON.parse(req.body);
  if (!body.email) {
    res.status(400).send("Bad Request: Missing email or invalid");
    return;
  }

  if (!body.interviewId) {
    res.status(400).send("Bad Request: Missing interviewId or invalid");
    return;
  }

  const response: ApiErrorResponse<unknown> | ApiOkResponse<unknown> =
    await api.delete(`/user/${body.email}/remove-interview`, {
      interviewId: body.interviewId,
    });

  if (response.ok) {
    res.status(200).json(response.data);
  } else {
    console.log(response?.data);
    res.status(500).send(`Internal Server Error: ${response?.data}`);
  }
}
