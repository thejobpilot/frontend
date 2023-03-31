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

export function getIdFromArray(arr: any, id: any) {
  if (!arr || !id) return null;
  id = parseInt(id);
  for (let idx in arr) {
    if (arr[idx].id === id) {
      return arr[idx];
    }
  }
  return null;
}


export function userHasInterviewByID(user: any, id: any) {
  if (!user || !id) return false;
  id! = parseInt(id);
  for (const i in user.interviews) {
    if (user.interviews[i].id === id) {
      return true;
    }
  }
  return false
}