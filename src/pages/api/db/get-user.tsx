import { Configuration, User, UsersApi } from "jobpilot-backend";
import { AxiosError } from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const email = req.query.email as string;
  if (!email) {
    res.status(400).send("Bad Request: Missing email or invalid");
    return;
  }

  const api = new UsersApi(
    new Configuration({
      basePath: "https://7kaz5avhmv.us-east-2.awsapprunner.com",
    })
  );

  let axiosResponse = await api
    .getOneBaseUserControllerUser(email)
    .catch((error: AxiosError) => {
      if (error.response?.status === 404) {
        res.status(404).send("User not found");
      } else {
        console.log(error.response?.data);
        res.status(500).send("Internal Server Error");
      }
    });

  if (axiosResponse) {
    res.status(200).json(axiosResponse.data);
  }
}





