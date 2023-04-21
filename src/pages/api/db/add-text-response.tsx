import {NextApiRequest, NextApiResponse} from "next";
import api from "@/utils/utils";
import {ApiErrorResponse, ApiOkResponse} from "apisauce";

export default async function addTextResponse(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const responseId: number = parseInt(req.query.responseId as string);
    const questionId: number = parseInt(req.query.questionId as string);
    let body = JSON.parse(req.body);
    const answer: string = body.answer as string;
    const formatted = {
        answer: answer,
    }

    console.log("answer", answer)
    const response: ApiErrorResponse<unknown> | ApiOkResponse<unknown> =
        await api.post(`/response/${responseId}/question/${questionId}/textanswer`, formatted);

    if (response.ok) {
        res.status(200).send(response.data);
    } else {
        console.log("fail", response?.data);
        res.status(500).send(`Internal Server Error: ${response?.data}`);
    }
}