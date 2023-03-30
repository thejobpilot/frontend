import { NextApiRequest, NextApiResponse } from "next";
import api from "@/utils/utils";
import { ApiErrorResponse, ApiOkResponse } from "apisauce";

export default async function newUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = JSON.parse(req.body);
  if (user.username == "") user.username = user.email;

  const response: ApiErrorResponse<unknown> | ApiOkResponse<unknown> =
    await api.post("/user/", user);

  if (response.ok) {
    res.status(200).json(response.data);
  } else {
    console.log(response?.data);
    res.status(500).send("Internal Server Error");
  }
}
