import { Inter } from "@next/font/google";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import NavBar from "@/components/navBar";
import SignIn from "@/components/signIn";
import ResponsiveAppBar from "@/components/navBar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <ResponsiveAppBar></ResponsiveAppBar>
    </>
  );
}
