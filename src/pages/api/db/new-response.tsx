import { NextApiRequest, NextApiResponse } from "next";
import api from "@/utils/utils";
import { ApiErrorResponse, ApiOkResponse } from "apisauce";

export default async function newResponse(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id: number = parseInt(req.query.interviewId as string);
  const email = req.query.applicantEmail as string;
  const body = {
    score: 0,
    aiRating: "no",
    endTime: 0,
    startTime: 0,
  };

  const response: ApiErrorResponse<unknown> | ApiOkResponse<unknown> =
    await api.post(`/interview/${id}/reponse/${encodeURIComponent(email)}`, body);

  if (response.ok) {
    res.status(200).send(response.data);
  } else {
    console.log("fail", response?.data);
    res.status(500).send(`Internal Server Error: ${response?.data}`);
  }
}
