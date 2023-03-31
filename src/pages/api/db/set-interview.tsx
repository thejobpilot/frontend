import { NextApiRequest, NextApiResponse } from "next";
import api from "@/utils/utils";
import { ApiErrorResponse, ApiOkResponse } from "apisauce";

export default async function updateUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id: number = parseInt(req.query.id as string);
  const positionId: number = parseInt(req.query.positionId as string);
  // const interview = JSON.parse(req.body);
  // const formattedInterview = {
  //   name: interview.name,
  //   prepTime: parseInt(interview.prepTime),
  //   retakes: parseInt(interview.retakes),
  // };

  const response: ApiErrorResponse<unknown> | ApiOkResponse<unknown> =
    await api.patch(`/position/${positionId}/interview/${id}`, req.body);

  if (response.ok) {
    res.status(200).json(response.data);
  } else {
    console.log("fail", response?.data);
    res.status(500).send(`Internal Server Error: ${response?.data}`);
  }
}

// async function updateUser(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const id: number = parseInt(req.query.id as string);
//   const positionId: number = parseInt(req.query.positionId as string);
//   console.log(req.body);
//   const interview = JSON.parse(req.body);
//   const formattedInterview: Interview = {
//     name: interview.name,
//     prepTime: parseInt(interview.prepTime),
//     retakes: parseInt(interview.retakes),
//   };

//   const usersApi = new InterviewApi(
//     new Configuration({
//       basePath: "https://7kaz5avhmv.us-east-2.awsapprunner.com",
//     })
//   );

//   let axiosResponse = await usersApi
//     .updateOneBaseInterviewsControllerInterview(
//       id,
//       positionId,
//       formattedInterview
//     )
//     .catch((error: AxiosError) => {
//       console.log(error.response?.data);
//     })
//     .then((r) => {
//       if (!r) return;
//       res.status(200).json(r.data);
//     });
// }
