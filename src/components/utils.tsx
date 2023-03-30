export const UserUserTypeEnum = {
  Applicant: "applicant",
  Recruiter: "recruiter",
  Employer: "employer",
} as const;

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}