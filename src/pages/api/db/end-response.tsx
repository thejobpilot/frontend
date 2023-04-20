import { NextApiRequest, NextApiResponse } from "next";
import api from "@/utils/utils";
import { ApiErrorResponse, ApiOkResponse } from "apisauce";

export default async function endResponse(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const responseId: number = parseInt(req.query.responseId as string);
  const interviewId: number = parseInt(req.query.interviewId as string);
  const email = req.query.applicantEmail as string;
  const body = {
    score: 0,
    aiRating: "ungraded",
    startTime: req.query.startTime,
    endTime: req.query.endTime,
  };

  const response: ApiErrorResponse<unknown> | ApiOkResponse<unknown> =
    await api.patch(
      `/interview/${interviewId}/response/${encodeURIComponent(
        email
      )}/${responseId}`,
      body
    );

  if (response.ok) {
    res.status(200).send(response.data);
  } else {
    console.log(response?.data);
    res.status(500).send(`Internal Server Error: ${response?.data}`);
  }
}
