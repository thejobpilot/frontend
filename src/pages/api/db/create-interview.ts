import { NextApiRequest, NextApiResponse } from "next";
import api from "@/utils/utils";
import handleBackendResponse from "@/pages/api/apiUtils";

export default async function createInterview(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let body = JSON.parse(req.body);
  let name = body["name"];
  let positionId = body["positionId"];
  const response = await api.post(
    `/position/${encodeURIComponent(positionId)}/interview`,
    {
      name: name,
      retakes: 0,
      prepTime: 10,
      interviewLength: 20,
    }
  );
  handleBackendResponse(res, response);
}
