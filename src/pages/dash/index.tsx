import { useUser } from "@auth0/nextjs-auth0/client";
import React, { useEffect } from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";

export default function Profile() {
  const router = useRouter();

  useEffect(() => {
    router.push("/applicant/dash");
  }, []);

  const { error, isLoading } = useUser();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return null;
}

export const getServerSideProps = withPageAuthRequired();
