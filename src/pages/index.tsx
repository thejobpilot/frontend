import { Inter } from "@next/font/google";
import { Box, Button } from "@mui/material";
import ResponsiveAppBar from "@/components/navBar";
import { display } from "@mui/system";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    return (
        <>
            <ResponsiveAppBar></ResponsiveAppBar>
            <div style={{ display: "flex", flexDirection: "column", height: "100vh", backgroundColor: "#F5F5F5" }}>
                <Box
                    component="img"
                    sx={{
                        mt: 30,
                        mb: 0,
                        mx: "40.5%",
                        maxHeight: "300px",
                        animation: "fly-in 1s ease-out forwards"
                    }}
                    src="/images/transpb.png"
                />
                <Button
                    type="submit"
                    variant="contained"
                    sx={{
                        mt: 3,
                        mb: 2,
                        mx: "45%",
                        opacity: 0,
                        animation: "fade-in 0.5s ease-out forwards 1s",
                        color: "#fff",
                        backgroundColor: "#111E31",
                        "&:hover": {
                            backgroundColor: "#8549a8"
                        }
                    }}
                    href="/login"
                >
                    Get started
                </Button>
            </div>
            <style jsx>{`
        @keyframes fly-in {
          from {
            transform: translateY(-200%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
        </>
    );
}
