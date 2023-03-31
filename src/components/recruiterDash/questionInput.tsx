import { Box } from "@mui/system";
import { TextField, IconButton } from "@mui/material";
import { RemoveCircle } from "@mui/icons-material";

export default function QuestionInput(props: any) {
    return (
      <Box
        key={props.index}
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
          alignItems: "center",
        }}
      >
        <TextField
          label={`Question ${props.index + 1}`}
          variant="outlined"
          value={props.question}
          sx={{width: "100%"}}
          onChange={(e) => props.updater(props.index, e.target.value)}
          inputProps={{ type: "string" }}
          required
        />
        <IconButton
          color="error"
          onClick={() => props.deleter(props.index)}
        >
          <RemoveCircle />
        </IconButton>
      </Box>
    );
}