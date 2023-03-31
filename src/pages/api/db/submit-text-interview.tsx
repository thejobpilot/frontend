import {NextApiRequest, NextApiResponse} from "next";
import api from "@/utils/utils";
import {ApiErrorResponse, ApiOkResponse} from "apisauce";

export default async function createQuestion(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const email: string = req.query.email as string;
    const interviewId: number = parseInt(req.query.interviewId as string);
    console.log(interviewId)
    console.log(email)
    const response: ApiErrorResponse<unknown> | ApiOkResponse<unknown> =
        await api.post(`/interview/${interviewId}/response/${email}`);

    if (response.ok) {
        res.status(200).send(response.data);
    } else {
        console.log("fail", response?.data);
        res.status(500).send(`Internal Server Error: ${response?.data}`);
    }
}