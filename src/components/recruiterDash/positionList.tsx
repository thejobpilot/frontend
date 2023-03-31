import { useEffect, useState } from "react";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { getIdFromArray } from "../utils";

export default function PositionList(props: any) {
  const [selected, setSelected] = useState({
    position: getIdFromArray(props.data.positions, props.selected?.positionId),
    interview: null,
  });

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
              </ListItem>
            ))
          : selected.position.interviews?.map((interview: any) => (
              <ListItem
                key={interview.id}
                button
                selected={
                  selected.interview && interview === selected.interview
                }
                onClick={() => {
                  props.setInterviewId(interview.id);
                }}
                sx={{ borderBottom: "1px solid #E0E0E0" }}
              >
                <ListItemText primary={interview.name} />
              </ListItem>
            ))}
      </List>
    </Box>
  );
}
