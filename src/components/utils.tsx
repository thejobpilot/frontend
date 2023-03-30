import Head from "next/head";

export const UserType = {
  Applicant: "applicant",
  Recruiter: "recruiter",
  Employer: "employer",
} as const;

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getInterviewInfoFromPath(path: string) {
  return "";
}

export function withTitle(title: string) {
  return function PageWithTitle(Component?: any) {
    return function ComponentWithTitle(props: any) {
      return (
        <>
          <Head>
            <title>{title}</title>
          </Head>
          <Component {...props} />
        </>
      );
    };
  };
}