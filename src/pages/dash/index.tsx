import { useUser } from "@auth0/nextjs-auth0/client";
import React, { useEffect, useState } from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import useUserDB from "@/components/db/useUserDB";
import Onboarding from "@/components/onboarding";
import { UserUserTypeEnum } from "gen/api/dist";
import { User } from "gen/api";
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
<<<<<<< HEAD
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
    };
    requestNewUser(newUser);    
    mutate(newUser);
  }



  useEffect(() => {
    if (user && user.email) setEmail(user.email);
=======
  const { data, isError, isLoading: loadingDB } = useUserDB(email);

  useEffect(() => {
    if (user && user.email) setEmail(user.email);

    console.log("Email: " + email + " IsError: " + isError?.status);
>>>>>>> 568889640f91ad80074daeea2f06d1a36eb10f67
    if (email != "" && isError) {
      setCaptureState(CaptureStates.USER_NOT_ONBOARDED);
      return;
    }
<<<<<<< HEAD
    if (email != "" && !loading && !isError && !isLoading) {
=======

    if (email != "" && !loadingDB && !isError && !isLoading) {
>>>>>>> 568889640f91ad80074daeea2f06d1a36eb10f67
      setCaptureState(CaptureStates.USER_READY);
      return;
    } else {
      setCaptureState(CaptureStates.USER_NOT_FOUND);
      return;
    }
  }, [user, isError]);

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
  if (loadingDB) return <div>Loading DB...</div>;

  if (isError) return <h1>404 Error </h1>;
  if (error) return <div>Error: {error.message}</div>;

  return <h2>Not found</h2>;
}

export const getServerSideProps = withPageAuthRequired();
