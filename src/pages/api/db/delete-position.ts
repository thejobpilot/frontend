import { NextApiRequest, NextApiResponse } from "next";
import api from "@/utils/utils";
import handleBackendResponse from "@/pages/api/apiUtils";

export default async function deletePosition(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let body = JSON.parse(req.body);
  let email = body["email"];
  let id = body["id"];
  const response = await api.delete(
    `/position/${encodeURIComponent(email)}/${id}`
  );
  handleBackendResponse(res, response);
}
