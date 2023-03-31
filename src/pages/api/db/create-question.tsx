import {NextApiRequest, NextApiResponse} from "next";
import api from "@/utils/utils";
import {ApiErrorResponse, ApiOkResponse} from "apisauce";

export default async function createQuestion(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const questionId: number = parseInt(req.query.questionId as string);
    const interviewId: number = parseInt(req.query.interviewId as string);
    const formattedQuestion = {
        prompt: "",
    };
    console.log(questionId)
    const response: ApiErrorResponse<unknown> | ApiOkResponse<unknown> =
        await api.post(`/interview/${interviewId}/question/`, formattedQuestion);

    if (response.ok) {
        res.status(200).json(response.data);
    } else {
        console.log("fail", response?.data);
        res.status(500).send(`Internal Server Error: ${response?.data}`);
    }
}