import { useUser } from "@auth0/nextjs-auth0/client";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import useUserDB from "@/components/db/useUserDB";
import { useEffect, useState } from "react";

function userHasInterviewID(user: any, id: any, updater: any) {
  if (!user) {
    updater(null);
    return;
  }
  id! = parseInt(id);
  for (const i in user.interviews) {
    if (user.interviews[i].id === id) {
      updater(user.interviews[i]);
      return;
    }
  }
  updater(null);
}

export default function Interview() {
  const router = useRouter();
  const [interview, setInterview] = useState<any>(null);
  const { user, error, isLoading } = useUser();
  const { id } = router.query;

  const {
    data,
    isLoading: isLoadingDB,
    isError,
  } = useUserDB(user ? user.email! : "");
  useEffect(() => {
    userHasInterviewID(data, id, setInterview);
  }, [data, id]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (isLoadingDB) return <div>Loading...</div>;
  if (isError) return <div>{isError.message}</div>;

  if (interview === null) return <h1>Error: Not your interview</h1>;

  return (
    interview && (
      <>
        <h1>Found your interview! Interview {id}</h1>
        <h3>Name: {interview.name!}</h3>
        <h3>prepTime: {interview.prepTime!}</h3>
      </>
    )
  );
}

export const getServerSideProps = withPageAuthRequired();