import { Box, Card, CardContent, Typography } from "@mui/material";

export default function ResponseCard(props: any) {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="body1">{props?.question?.answer}</Typography>
    </Box>
  );
}
