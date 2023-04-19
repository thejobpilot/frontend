import { Interview } from "@/pages/interview/[id]";
import Head from "next/head";

export const UserType = {
  Applicant: "applicant",
  Recruiter: "recruiter",
  Employer: "employer",
} as const;

export enum InterviewState {
  BAD_STATE,
  NOT_STARTED,
  FINISHED,
  IN_PROGRESS
}

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

export function youtubeURLToId(url: string) {
  let rx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
  if (!url) return null;
  let m = url.match(rx);
  if (!m || m.length < 2) return null;
  return m[1];
}

export function getInterviewState(startTime: any, endTime: any) {
  if (!startTime && !endTime) return InterviewState.NOT_STARTED;
  if (startTime >= endTime) return InterviewState.FINISHED;
  if (startTime < endTime) InterviewState.IN_PROGRESS;
  return InterviewState.BAD_STATE;
}

export function validateLocalStorageTime(len: number, storage: string) {
  // bad input; ignore
  if (!len) return -2;
  const now = new Date();
  const saved = typeof window !== "undefined" && localStorage.getItem(storage); 
  // 0 == no saved
  if (!saved) return 0;
  // -1 == in the past == finish
  if (now > new Date(saved)) return -1;
  // 1 == valid
  return 1;
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