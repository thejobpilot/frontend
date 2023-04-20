import { NextApiRequest, NextApiResponse } from "next";
import api from "@/utils/utils";
import handleBackendResponse from "@/pages/api/apiUtils";

export default async function deleteInterview(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let body = JSON.parse(req.body);
  let id = body["id"];
  let positionId = body["positionId"];
  const response = await api.delete(
    `/position/${encodeURIComponent(positionId)}/interview/${id}`
  );
  handleBackendResponse(res, response);
}
