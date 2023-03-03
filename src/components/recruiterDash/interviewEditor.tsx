import { useState } from "react";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";

export default function InterviewEditor(props: any) {

  return (
    <Box
      sx={{
        p: 3,
        bgcolor: "white",
        color: "black",
        position: "absolute",
        top: 55,
        right: "35%",
        height: "100%",
        width: "30%",
      }}
    >
      <Typography
        variant="h5"
        sx={{ bgcolor: "#111E31", color: "white", p: 2, textAlign: "center" }}
      >
        Interview Editor
      </Typography>
    </Box>
  );
}
