import { useUser } from "@auth0/nextjs-auth0/client";
import React, { useEffect, useState } from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import useUserDB from "@/components/db/useUserDB";

enum CaptureStates {
  USER_NOT_FOUND,
  USER_NOT_ONBOARDED,
  USER_READY,
}

export default function Profile() {
  const router = useRouter();
  const [captureState, setCaptureState] = useState<CaptureStates>(
    CaptureStates.USER_NOT_FOUND
  );
  const [email, setEmail] = useState("");
  const { user, error, isLoading } = useUser();
  const { data, isError, isLoading: loading } = useUserDB(email);

  useEffect(() => {
    if (user && user.email) setEmail(user.email);

    if (email != "" && isError) {
      setCaptureState(CaptureStates.USER_NOT_ONBOARDED);
    }

    if (email != "" && !loading && !isError && !isLoading) {
      setCaptureState(CaptureStates.USER_READY);
    } else {
      setCaptureState(CaptureStates.USER_NOT_FOUND);
    }
  }, [data, user, isLoading, email, isError]);

  if (captureState == CaptureStates.USER_NOT_ONBOARDED) {
    return <h1>NEED TO BE ONBOARDED</h1>;
  }
  if (captureState == CaptureStates.USER_READY) {
    router.push(`/${data?.userType}/dash`);
    return null;
  }

  if (isLoading) return <div>Loading Auth0...</div>;
  if (loading) return <div>Loading DB...</div>;

  if (isError) return <h1>404 Error {captureState}</h1>
  if (error) return <div>Error: {error.message}</div>;

  return <h2>Not found</h2>;
}

export const getServerSideProps = withPageAuthRequired();
