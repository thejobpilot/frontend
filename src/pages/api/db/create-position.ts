import { NextApiRequest, NextApiResponse } from "next";
import api from "@/utils/utils";
import handleBackendResponse from "@/pages/api/apiUtils";

export default async function createPosition(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let body = JSON.parse(req.body);
  let name = body["name"];
  let email = body["email"];
  const response = await api.post(`/position/${encodeURIComponent(email)}/`, {
    name: name,
  });
  handleBackendResponse(res, response);
}
