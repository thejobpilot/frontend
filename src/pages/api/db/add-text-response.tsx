import {NextApiRequest, NextApiResponse} from "next";
import api from "@/utils/utils";
import {ApiErrorResponse, ApiOkResponse} from "apisauce";

export default async function addTextResponse(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const responseId: number = parseInt(req.query.responseId as string);
    const questionId: number = parseInt(req.query.questionId as string);
    const answer: string = req.query.answer as string;

    const response: ApiErrorResponse<unknown> | ApiOkResponse<unknown> =
        await api.post(`/response/${responseId}/question/${questionId}/textanswer`, {answer: answer});

    if (response.ok) {
        res.status(200).send(response.data);
    } else {
        console.log("fail", response?.data);
        res.status(500).send(`Internal Server Error: ${response?.data}`);
    }
}