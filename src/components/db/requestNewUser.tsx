import { User } from "@auth0/auth0-react";
import { UserUserTypeEnum } from "gen/api";
import { User as UserDB } from "jobpilot-backend";

export default async function requestNewUser(
  user: User,
) {
  const newUser: UserDB = {
    email: user.email!,
    fullName: user.name!,
    gpa: 0.0,
    graduationDate: "2023-03-02",
    resumeLink: "",
    retakes: false,
    userType: user.userType!,
    username: user.name!,
    jobPreference: "",
    rolePreference: "",
    locationPreference: "",
  };

  await fetch(`/api/db/new-user`, {
    body: JSON.stringify(newUser),
    method: "PUT",
  });
}
