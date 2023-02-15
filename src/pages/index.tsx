import {Inter} from '@next/font/google'
import {AppBar, IconButton, Toolbar, Typography} from "@mui/material";
import NavBar from "@/components/navBar";
import SignIn from "@/components/signIn";

const inter = Inter({subsets: ['latin']})

export default function Home() {
    return (
        <>
            <NavBar></NavBar>
            <SignIn></SignIn>
        </>
    )
}