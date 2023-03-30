import { User } from "@auth0/auth0-react";

export default async function requestNewUser(
  user: User,
) {
  const newUser= {
    email: user.email!,
    fullName: user.name ? user.name : user.email!,
    gpa: 0.0,
    graduationDate: "2023-03-02",
    resumeLink: "",
    retakes: false,
    userType: user.userType!,
    username: user.name ? user.name : user.email!,
    jobPreference: "",
    rolePreference: "",
    locationPreference: "",
  };

  await fetch(`/api/db/new-user`, {
    body: JSON.stringify(newUser),
    method: "PUT",
  });
}
