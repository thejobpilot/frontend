import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Button,
  IconButton,
} from "@mui/material";
import { ArrowBack, Delete } from "@mui/icons-material";
import { getIdFromArray } from "../utils";
import CreateObjectDialog from "@/components/manage-interviews/createObjectDialog";
import requestNewPosition from "@/components/db/requestNewPosition";
import requestNewInterview from "@/components/db/requestNewInterview";
import { useSWRConfig } from "swr";
import deleteInterview from "@/pages/api/db/delete-interview";
import requestDeleteInterview from "@/components/db/requestDeleteInterview";
import requestDeletePosition from "@/components/db/requestDeletePosition";

export default function PositionList(props: any) {
  const [selected, setSelected] = useState({
    position: getIdFromArray(props.data.positions, props.selected?.positionId),
    interview: null,
  });
  const [isDialogOpen, setOpenDialog] = useState(false);
  const { mutate } = useSWRConfig();

  useEffect(() => {
    let positionCache = getIdFromArray(
      props.data.positions,
      props.selected?.positionId
    );
    let interviewCache = getIdFromArray(
      positionCache?.interviews,
      props.selected?.interviewId
    );
    setSelected({
      position: positionCache,
      interview: interviewCache,
    });
  }, [
    props.data,
    props.data.positions,
    props.selected?.positionId,
    props.selected?.interviewId,
  ]);

  if (props.isLoading || !props.data) return <div>Loading...</div>;
  if (props.error) return <div>{props.error.message}</div>;

  const handleBackClick = () => {
    props.setInterviewId(null);
    props.setPositionId(null);
  };

  const handleCreatePositionClick = () => {
    setOpenDialog(true);
  };

  const handleCreateInterviewClick = () => {
    setOpenDialog(true);
  };

  const compareSelection = (selected: any, interview: any) => {
    if (selected && selected.interview && interview) {
      return interview === selected.interview;
    }
    return false;
  };
  const handleDialogClose = async (name: string) => {
    setOpenDialog(false);
    if (name.trim() === "") return;
    if (!selected.position) {
      await requestNewPosition(name, props.user.email);
    } else {
      await requestNewInterview(name, selected.position.id.toString());
    }
    //very scuffed but i'd have to do a lot of refactoring to properly mutate only the positions/interviews
    await mutate(`/api/db/get-user?email=${props.user.email}`);
  };

  const handleDeleteItem = async (item: number, event: any) => {
    event.stopPropagation();
    if (!selected.position) {
      let response = await requestDeletePosition(item, props.user.email);
      let string = await response.text();
      if (string.includes("violates foreign key constraint")) {
        window.alert(
          "This position still has interviews associated with it. Please delete those first."
        );
      }
    } else {
      await requestDeleteInterview(item, selected.position.id);
    }
    //very scuffed but i'd have to do a lot of refactoring to properly mutate only the positions/interviews
    await mutate(`/api/db/get-user?email=${props.user.email}`);
  };

  // @ts-ignore
  // @ts-ignore
  return (
    <Box
      sx={{
        p: 3,
        bgcolor: "white",
        color: "black",
        position: "absolute",
        top: 55,
        left: 0,
        height: "100%",
        width: "30%",
      }}
    >
      <Typography
        variant="h5"
        sx={{ bgcolor: "#111E31", color: "white", p: 2, textAlign: "center" }}
      >
        {selected.position != null ? (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ArrowBack
              sx={{ mr: 2, cursor: "pointer" }}
              onClick={handleBackClick}
            />
            <Typography variant="h5">{selected.position.name}</Typography>
          </Box>
        ) : (
          "Positions"
        )}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 2,
          mt: 2,
          mx: "auto",
        }}
      >
        {!selected.position && (
          <Button
            variant="contained"
            onClick={handleCreatePositionClick}
            sx={{ bgcolor: "#111E31" }}
          >
            Create Position
          </Button>
        )}
        {selected.position && (
          <Button
            variant="contained"
            onClick={handleCreateInterviewClick}
            sx={{ bgcolor: "#111E31" }}
          >
            Create Interview
          </Button>
        )}
      </Box>

      <List>
        {selected.position == null
          ? props.data.positions.map((position: any) => (
              <ListItem
                key={position.id}
                button
                onClick={() => {
                  props.setPositionId(position.id);
                }}
                sx={{ borderBottom: "1px solid #E0E0E0" }}
              >
                <ListItemText primary={position.name} />
                <IconButton
                  onClick={(event) => handleDeleteItem(position.id, event)}
                >
                  <Delete color="error" />
                </IconButton>
              </ListItem>
            ))
          : selected.position.interviews?.map((interview: any) => (
              <ListItemButton
                key={interview.id}
                selected={compareSelection(selected, interview)}
                onClick={() => {
                  props.setInterviewId(interview.id);
                }}
                sx={{ borderBottom: "1px solid #E0E0E0" }}
              >
                <ListItemText primary={interview.name} />
                <IconButton
                  onClick={(event) => handleDeleteItem(interview.id, event)}
                >
                  <Delete color="error" />
                </IconButton>
              </ListItemButton>
            ))}
      </List>
      <CreateObjectDialog
        isPosition={!selected.position}
        email={props.user.email}
        open={isDialogOpen}
        onClose={handleDialogClose}
      ></CreateObjectDialog>
    </Box>
  );
}
