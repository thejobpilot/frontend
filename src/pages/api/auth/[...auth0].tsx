import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";
import { Configuration, User, UsersApi } from "jobpilot-backend";
import { UserUserTypeEnum } from "gen/api";
import { AxiosError } from "axios";

export default handleAuth({
  async login(req, res) {
    let user: User = {
      email: "john@google.com",
      fullName: "john",
      gpa: 0,
      graduationDate: "2005-01-01",
      resumeLink: "",
      retakes: false,
      userType: UserUserTypeEnum.Applicant,
      username: "",
    };
    let usersApi = new UsersApi(
      new Configuration({
        basePath: "https://7kaz5avhmv.us-east-2.awsapprunner.com",
      })
    );
    let axiosResponse = await usersApi
      .createOneBaseUserControllerUser(user)
      .catch((error: AxiosError) => {
        console.log(error.response?.data);
      })
      .then((res) => console.log("worked"));
    await handleLogin(req, res, {
      returnTo: "/dash",
    });
  },
});
