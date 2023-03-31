import ResponsiveAppBar from "@/components/navBar";
import InterviewPage from "@/components/interviewComponents/interviewPage";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import useUserDB from "@/components/db/useUserDB";
import { withTitle } from "@/components/utils";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export function Written(props: any) {
  const router = useRouter();
  const { id } = router.query;
  const { user, error, isLoading } = useUser();
  const [interview, setInterview] = useState<any>(null);

  const {
    data,
    isLoading: isLoadingDB,
    isError,
  } = useUserDB(user ? user.email! : "");

  useEffect(() => {
    if (data && data.interviews) {
      setInterview(
        data.interviews.find((interview: any) => interview.id == id)
      );
    }
  }, [data]);

  return (
    <>
      <ResponsiveAppBar></ResponsiveAppBar>
      <InterviewPage user={data} interview={interview}></InterviewPage>
    </>
  );
}

export const getServerSideProps = withPageAuthRequired();
export default withTitle("Written Interview")(Written);
