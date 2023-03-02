import { Configuration, User, UsersApi } from "jobpilot-backend";
import { UserUserTypeEnum } from "gen/api";
import { AxiosError } from "axios";

export default async function getUser(req: { query: { email: string; }; }, res) {
    const userId = req.query.email as string;

    const usersApi = new UsersApi(
      new Configuration({
        basePath: "https://7kaz5avhmv.us-east-2.awsapprunner.com",
      })
    );

    let axiosResponse = await usersApi
      .getOneBaseUserControllerUser(userId)
      .catch((error: AxiosError) => {
        console.log(error.response?.data);
      })
      .then((r) => {
        if (!r) return;
        res.status(200).json(r.data);
      }); 
}
