import ResponsiveAppBar from "@/components/navBar";
import InterviewPage from "@/components/interviewComponents/interviewPage";

export default function Written(props: any) {
    return (
      <>
        <ResponsiveAppBar></ResponsiveAppBar>
        <InterviewPage
          user={props.user}
          interview={props.interview}
        ></InterviewPage>
      </>
    );
}

