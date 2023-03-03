import { Configuration, User, UsersApi } from "jobpilot-backend";
import { UserUserTypeEnum } from "gen/api";
import { AxiosError } from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function updateUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const username = req.query.username as string;
  const email = req.query.email as string;
  // const fullName = req.query.fullName as string;
  // const graduationDate = req.query.graduationDate as string;
  // const gpa = req.query.gpa as unknown as number;
  // const resumeLink = req.query.resumeLink as string;

  // const user: User = {
  //   email: email,
  //   fullName: fullName,
  //   gpa: gpa,
  //   graduationDate: graduationDate,
  //   resumeLink: resumeLink,
  //   retakes: true,
  //   userType: UserUserTypeEnum.Applicant,
  //   username: username,
  // };
  const user: User = JSON.parse(req.body);

  const usersApi = new UsersApi(
    new Configuration({
      basePath: "https://7kaz5avhmv.us-east-2.awsapprunner.com",
    })
  );

  let axiosResponse = await usersApi
    .updateOneBaseUserControllerUser(email, user)
    .catch((error: AxiosError) => {
      console.log(error.response?.data);
    })
    .then((r) => {
      if (!r) return;
      res.status(200).json(r.data);
    });
}
