import {NextApiRequest, NextApiResponse} from "next";
import api from "@/utils/utils";
import {ApiErrorResponse, ApiOkResponse} from "apisauce";

export default async function updateResponse(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const email = req.query.email as string;
    const interviewId = req.query.interviewId as string;
    const responseId = req.query.responseId as string;
    const score = req.query.score as string;

    let url = `/interview/${interviewId}/response/${encodeURIComponent(email)}/${responseId}`;
    console.log(url);
    const response: ApiErrorResponse<unknown> | ApiOkResponse<unknown> =
        await api.patch(
            url,
            {
              score: score
            }
        );

    if (response.ok) {
        res.status(200).json(response.data);
    } else {
        console.log(response?.data);
        res.status(500).send(`Internal Server Error: ${response?.data}`);
    }
}
