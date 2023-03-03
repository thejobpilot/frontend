import { useUser } from "@auth0/nextjs-auth0/client";
import React, { useEffect, useState } from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import useUserDB from "@/components/db/useUserDB";
import Onboarding from "@/components/onboarding";
import { User, UserUserTypeEnum } from "jobpilot-backend";
import requestNewUser from "@/components/db/requestNewUser";

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
  const [selectedType, setSelectedType] = useState(UserUserTypeEnum.Applicant);
  const { user, error, isLoading } = useUser();
  const { data, isError, isLoading: loading, mutate } = useUserDB(email);

  const handleTypeChange = (event: any) => {
    setSelectedType(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const newUser: User= {
      email: email,
      fullName: user!.nickname!,
      gpa: 0.0,
      graduationDate: "2023-03-02",
      resumeLink: "",
      retakes: false,
      userType: selectedType,
      username: user!.nickname!,
      jobPreference: "",
      rolePreference: "",
      locationPreference: ""
    };
    requestNewUser(newUser);    
    mutate(newUser);
  }

  useEffect(() => {
    if (user && user.email) setEmail(user.email);
    if (email != "" && isError) {
      setCaptureState(CaptureStates.USER_NOT_ONBOARDED);
      return;
    }
    if (email != "" && !loading && !isError && !isLoading) {
      setCaptureState(CaptureStates.USER_READY);
      return;
    } else {
      setCaptureState(CaptureStates.USER_NOT_FOUND);
      return;
    }
  }, [data, isLoading, user, isError]);

  if (captureState == CaptureStates.USER_NOT_ONBOARDED) {
    return (
      <Onboarding
        selectedType={selectedType}
        handleTypeChange={handleTypeChange}
        handleSubmit={handleSubmit}
      ></Onboarding>
    );
  }
  if (captureState == CaptureStates.USER_READY) {
    router.push(`/${data?.userType}/dash`);
    return null;
  }

  // Extra error handling (Shouldn't reach here much)
  if (isLoading) return <div>Loading Auth0...</div>;
  if (loading) return <div>Loading DB...</div>;

  if (isError) return <h1>404 Error </h1>;
  if (error) return <div>Error: {error.message}</div>;

  return <h2>Not found</h2>;
}

export const getServerSideProps = withPageAuthRequired();
