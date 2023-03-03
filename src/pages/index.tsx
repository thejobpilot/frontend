import { Inter } from "@next/font/google";
import { Box, Button } from "@mui/material";
import ResponsiveAppBar from "@/components/navBar";
import { display } from "@mui/system";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <ResponsiveAppBar></ResponsiveAppBar>
      <div style={{ display: "block" }}>
        <Box
          component="img"
          sx={{ mt: 30, mb: 0, mx: "40.5%", maxHeight: "300px"}}
          src="/images/transpb.png"
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 3, mb: 2, mx: "45%" }}
          href="/login"
        >
          Get started
        </Button>
      </div>
    </>
  );
}
