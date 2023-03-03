import {Configuration, Interview, InterviewApi} from "jobpilot-backend";
import {AxiosError} from "axios";
import {NextApiRequest, NextApiResponse} from "next";

export default async function updateUser(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const id: number = parseInt(req.query.id as string);
    const positionId: number = parseInt(req.query.positionId as string);
    const interview: Interview = JSON.parse(req.body);

    const usersApi = new InterviewApi(
        new Configuration({
            basePath: "https://7kaz5avhmv.us-east-2.awsapprunner.com",
        })
    );

    let axiosResponse = await usersApi
        .updateOneBaseInterviewsControllerInterview(id, positionId, interview)
        .catch((error: AxiosError) => {
            console.log(error.response?.data);
        })
        .then((r) => {
            if (!r) return;
            res.status(200).json(r.data);
        });
}
