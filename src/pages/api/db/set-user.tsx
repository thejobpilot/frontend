import { NextApiRequest, NextApiResponse } from "next";
import api from "@/utils/utils";
import { ApiErrorResponse, ApiOkResponse } from "apisauce";

export default async function setUser(
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
  //   userType: UserType.Applicant,
  //   username: username,
  // };
  const user = JSON.parse(req.body);

  const response: ApiErrorResponse<unknown> | ApiOkResponse<unknown> =
    await api.patch(
      `/user/${email}`,
      user
    );

  if (response.ok) {
    res.status(200).json(response.data);
  } else {
    console.log(response?.data);
    res.status(500).send("Internal Server Error");
  }
}
