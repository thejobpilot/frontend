import { Container } from "@mui/system";
import { Alert, AlertTitle } from "@mui/material";
import { capitalizeFirstLetter } from "./utils";

export default function Forbidden(props: any) {
  const severity = props.severity ? props.severity : "error";
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Alert
        variant="filled"
        severity={severity}
        sx={{ pr: "20px" }}
      >
        <AlertTitle>
          {capitalizeFirstLetter(severity)}: {props.error ? props.error : "Forbidden"}
        </AlertTitle>
        {props.message
          ? props.message
          : "You do not have access to this resource"}
      </Alert>
    </Container>
  );
}
