import { Box, Card, CardContent, Typography } from "@mui/material";

export default function ResponseCard({ question }) {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="body1">{question.answer}</Typography>
    </Box>
  );
}
