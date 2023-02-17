import {Inter} from '@next/font/google'
import { Button } from '@mui/material';
import ResponsiveAppBar from "@/components/navBar";
import { display } from '@mui/system';

const inter = Inter({subsets: ['latin']})

export default function Home() {
  return (
    <>
      <ResponsiveAppBar></ResponsiveAppBar>
      <div style={{display: "block"}}>
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 30, mb: 2, mx: "45%" }}
          href="/login"
        >
          Get started
        </Button>
      </div>
    </>
  );
}