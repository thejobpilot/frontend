import { NextApiRequest, NextApiResponse } from "next";
import api from "@/utils/utils";
import { ApiErrorResponse, ApiOkResponse } from "apisauce";

export default async function getUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const fields = req.query.fields as string;
  const search = req.query.search as string;
  const filter = req.query.filter as string;
  const or = req.query.or as string;
  const sort = req.query.sort as string;

  const urlBuilder = `/user?fields=${
    fields ? fields : ""}&s=${
    search ? search : ""}&filter=${
    filter ? filter : ""}&or=${
    or ? or : ""}&sort=${
    sort ? sort : ""}`;

  const response: ApiErrorResponse<unknown> | ApiOkResponse<unknown> =
    await api.get(urlBuilder);
  if (response.ok) {
    res.status(200).json(response.data);
  } else {
    console.log(response?.data);
    res.status(500).send(`Internal Server Error: ${response?.data}`);
  }
}
