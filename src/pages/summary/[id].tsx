import { useUser } from "@auth0/nextjs-auth0/client";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import useUserDB from "@/components/db/useUserDB";
import { useEffect, useState } from "react";
import Forbidden from "@/components/forbidden";
import { withTitle } from "@/components/utils";
import Behavioral from "@/pages/applicant/interviewDash";

export function SummaryPage() {
  const router = useRouter();
  const { id } = router.query;
  const [response, setResponse] = useState<any>(null);
  const { user, error, isLoading } = useUser();
  const {
    data,
    isLoading: isLoadingDB,
    isError,
  } = useUserDB(user ? user.email! : "");

  function getResponseByEmail(responses: any, email: any) {
    if (!responses || !email) return null;
    return responses.find((response: any) => response.applicantEmail === email);
  }

  useEffect(() => {
    if (data && data.responses) {
      console.log(data)
      let found = data.responses.find((response: any) => response.interviewId === id)
      let other = getResponseByEmail(data.responses, user?.email);
      if (found) setResponse(found);
      if (other) setResponse(other);
    }
  }, [data, id, user]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (isLoadingDB) return <div>Loading...</div>;
  if (isError) return <div>{isError.message}</div>;

  return response && <h1>{response.applicantEmail}</h1>;
}

export const getServerSideProps = withPageAuthRequired();
export default withTitle("Interview Summary")(SummaryPage);
