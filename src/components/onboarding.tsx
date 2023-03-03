import {
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";
import { UserUserTypeEnum } from "jobpilot-backend";

export default function Onboarding(props: any) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <form onSubmit={props.handleSubmit}>
        <Typography variant="h3" fontWeight={"bold"} gutterBottom>
          Welcome to JobPilot
        </Typography>
        <Typography variant="h5" gutterBottom>
          Let's get you onboarded!
        </Typography>
        <Typography component="p" marginTop={"30px"} gutterBottom>
          Which role suits you best?
        </Typography>
        <RadioGroup
          aria-label="role"
          name="role"
          defaultValue={UserUserTypeEnum.Applicant}
          value={props.selectedType}
          onChange={props.handleTypeChange}
          style={{
            marginBottom: "20px",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <FormControlLabel
            value={UserUserTypeEnum.Applicant}
            control={<Radio />}
            label="Applicant"
          />
          <FormControlLabel
            value={UserUserTypeEnum.Employer}
            control={<Radio />}
            label="Employer"
          />
          <FormControlLabel
            value={UserUserTypeEnum.Recruiter}
            control={<Radio />}
            label="Recruiter"
          />
        </RadioGroup>
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}
