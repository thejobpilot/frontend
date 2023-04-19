import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";

export default function CreateObjectDialog(props: {
  isPosition: boolean;
  email: string;
  open: boolean;
  onClose: (name: string) => void;
}) {
  const [name, setName] = useState(""); // Declare a state variable..
  const onClose = () => {
    props.onClose(name);
    setName("");
  };
  return (
    <Dialog open={props.open} onClose={onClose}>
      <DialogTitle>
        New {props.isPosition ? "Position" : "Interview"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter name for the new {props.isPosition ? "position" : "interview"}.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="string"
          fullWidth
          variant="standard"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button disabled={name.trim() === ""} onClick={onClose}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
