import {NextApiRequest, NextApiResponse} from "next";
import api from "@/utils/utils";
import {ApiErrorResponse, ApiOkResponse} from "apisauce";

export default async function deleteQuestion(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const responseId: number = parseInt(req.query.responseId as string);
    const interviewId: number = parseInt(req.query.interviewId as string);
    const email = req.query.applicantEmail as string;
    const response: ApiErrorResponse<unknown> | ApiOkResponse<unknown> =
      await api.delete(
        `/interview/${interviewId}/response/${encodeURIComponent(
          email
        )}/${responseId}`
      );

    if (response.ok) {
        res.status(200).json(response.data);
    } else {
        console.log("fail", response?.data);
        res.status(500).send(`Internal Server Error: ${response?.data}`);
    }
}
