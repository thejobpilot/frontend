import { Configuration, User, UsersApi } from "jobpilot-backend";
import { AxiosError } from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function newUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user: User = JSON.parse(req.body);
  if (user.username == "") user.username = user.email;

  const usersApi = new UsersApi(
    new Configuration({
      basePath: "https://7kaz5avhmv.us-east-2.awsapprunner.com",
    })
  );

  let axiosResponse = await usersApi
    .createOneBaseUserControllerUser(user)
    .catch((error: AxiosError) => {
      res.status(500).send(error.message);
    })
    .then((r) => {
      if (!r) return;
      res.status(200).json(r.data);
    });
}
