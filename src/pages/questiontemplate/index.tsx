import * as React from 'react';

import {Inter} from '@next/font/google'
import ResponsiveAppBar from "@/components/navBar";
import Question from "@/components/interviewQuestion";
const inter = Inter({subsets: ['latin']})

export default function questiontemplate() {
    
  return (
    <>
    <ResponsiveAppBar></ResponsiveAppBar>
    <Question></Question>
    



    </>
  );
}
