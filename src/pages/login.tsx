import {Inter} from '@next/font/google'
import SignIn from "@/components/signIn";
import ResponsiveAppBar from "@/components/navBarDefault";
import Router from 'next/router';
import { useUser } from '@auth0/nextjs-auth0/client';

const inter = Inter({subsets: ['latin']})

export default function Home() {
  const {user} = useUser();
  if (user) Router.push("/dash");

    return (
      <>
        <ResponsiveAppBar></ResponsiveAppBar>
        <SignIn></SignIn>
      </>
    );
}