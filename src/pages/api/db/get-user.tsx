import {NextApiRequest, NextApiResponse} from "next";
import api from "@/utils/utils";
import {ApiErrorResponse, ApiOkResponse} from "apisauce";

export default async function getUser(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const email = req.query.email as string;
    const response: ApiErrorResponse<unknown> | ApiOkResponse<unknown> = await api.get(`/user/${email}`);
    if (response.ok) {
        res.status(200).json(response.data);
    } else {
        console.log(response?.data);
        res.status(500).send(`Internal Server Error: ${response?.data}`);
    }
}





