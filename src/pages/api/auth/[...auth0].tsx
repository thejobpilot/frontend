import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";
import { Configuration, User, UsersApi } from "jobpilot-backend";
import { UserUserTypeEnum } from "gen/api";
import { AxiosError } from "axios";

export default handleAuth({
  async login(req, res) {
    await handleLogin(req, res, {
      returnTo: "/dash",
    });
  },
});
