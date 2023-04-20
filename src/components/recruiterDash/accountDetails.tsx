import { Box, Typography, TextField, Button } from "@mui/material";
import { UserType } from "../utils";
import { useEffect, useState } from "react";
import { capitalizeFirstLetter } from "../utils";
import requestSetUser from "../db/requestSetUser";
import useUserDB from "../db/useUserDB";

export default function AccountDetails(props: any) {
  const [details, setDetails] = useState({
    username: props.user.email as string,
    email: props.user.email as string,
    fullName: "",
    graduationDate: "",
    gpa: 0,
    resumeLink: "",
    userType: UserType.Applicant,
    retakes: true,
    jobPreference: "",
    rolePreference: "",
    locationPreference: "",
  });

  const { data, isLoading, isError, mutate } = useUserDB(props.user.email!);
  useEffect(() => {
    if (data) setDetails(data);
  }, [data]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    requestSetUser(details.email, details);
    mutate(details);
  };

  function updateField(e: any) {
    const { name, value } = e.target;
    setDetails((prev) => {
      return { ...prev, [name]: value };
    });
  }

  if (isError) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <Box
        sx={{
          p: 3,
          bgcolor: "white",
          color: "black",
          position: "absolute",
          top: 55,
          bottom: 0,
          alignItems: "center",
          width: '50%',
          display: 'inline', 
          justifyContent: 'center',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}
      >
        <Typography
          variant="h5"
          sx={{
            mb: 2,
            bgcolor: "#111E31",
            color: "white",
            borderRadius: 2,
            p: 2,
            textAlign: "center",
          }}
        >
          {`Account Details (${capitalizeFirstLetter(details.userType)})`}
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            id="outlined-username"
            label="Username"
            variant="outlined"
            name="username"
            required
            defaultValue={data.username}
            onChange={(e) => updateField(e)}
            inputProps={{ minLength: 3, maxLength: 20 }}
          />
          <TextField
            id="outlined-email"
            label="Email"
            variant="outlined"
            defaultValue={data.email}
            name="email"
            required
            disabled
            inputProps={{ type: "email" }}
          />
          <TextField
            id="outlined-last-name"
            label="Fullname"
            variant="outlined"
            name="fullName"
            required
            defaultValue={data.fullName}
            onChange={(e) => updateField(e)}
          />
          <TextField
            id="outlined-graduation-date"
            label="Company"
            variant="outlined"
            name="rolePreference"
            required
            defaultValue={data.rolePreference}
            onChange={(e) => updateField(e)}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ bgcolor: "#111E31", color: "white" }}
          >
            Save
          </Button>
        </Box>
      </Box>
    </form>
  );
}
