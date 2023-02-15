import {Inter} from '@next/font/google'
import NavBar from "@/components/navBar";
import SignIn from "@/components/signIn";
import SignUp from "@/components/signUp";

const inter = Inter({subsets: ['latin']})

export default function RecruiterSignUp() {
    return (
        <>
            <NavBar></NavBar>
            <SignUp name = "Applicant"></SignUp>
        </>
    )
}

