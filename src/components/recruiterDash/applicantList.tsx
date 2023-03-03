import { useEffect, useState } from "react";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import useUserDB from "../db/useUserDB";
import useAllUsers from "../db/useAllUsers";
import { User } from "jobpilot-backend";
import requestAssignInterview from "../db/requestAssignInterview";

// function searchInterviewForEmail(user: User, email: string) {
//   for (const pos of user.positions || []) {
//     const intersection = pos.interviews?.filter((element) =>
//       user.interviews?.includes(element)
//     );
//     if (intersection) {
//       console.log("intersection", intersection);
//       return intersection[0].id;
//     }
//   }
// }

export default function ApplicantList(props: any) {
  const users = useAllUsers();

  if (!users) return <div>Failed to load</div>;

  const addToInterview = (selectedEmail: string) => {
    if (props.selected.interview !== -1) {
      requestAssignInterview(selectedEmail, props.selected.interview.id);
      window.alert("Successfully assigned interview!");
    } else {
      console.log("failed")
    }
  }

  // const checkIfSent = (email: any) => {
  //   return searchInterviewForEmail(props.user, email)
  // }

  return (
    <Box
      sx={{
        p: 3,
        bgcolor: "white",
        color: "black",
        position: "absolute",
        top: 55,
        right: 0,
        height: "100%",
        width: "30%",
      }}
    >
      <Typography
        variant="h5"
        sx={{ bgcolor: "#111E31", color: "white", p: 2, textAlign: "center" }}
      >
        Applicant List
      </Typography>
      <List>
        {users.length > 0 ? (
          users.map((email) => (
            <ListItem
              key={email}
              button
              onClick={e => addToInterview(email)}
              sx={{ borderBottom: `1px solid #E0E0E0` }}
            >
              <ListItemText primary={email} />
            </ListItem>
          ))
        ) : (
          <ListItem disabled sx={{ borderBottom: "1px solid #E0E0E0" }}>
            <ListItemText primary={"No applicants found"} />
          </ListItem>
        )}
      </List>
    </Box>
  );
}

// export default function ApplicantList(props:any) {
//   const [apps, setApps] = useState([]);
//   const users = useAllUsers();

//   // const handleInterviewClick = (interview: any) => {
//   //   setSelectedInterview(interview);
//   //   setShowPositions(true);
//   // };

//   // const handleBackClick = () => {
//   //   setSelectedInterview(null);
//   //   setShowPositions(false);
//   // };

//   if (!users) return <div>Failed to load</div>;
//   // if (isLoading) return <div>Loading...</div>;
//   return (
//     <Box
//       sx={{
//         p: 3,
//         bgcolor: "white",
//         color: "black",
//         position: "absolute",
//         top: 55,
//         right: 0,
//         height: "100%",
//         width: "30%",
//       }}
//     >
//       <Typography
//         variant="h5"
//         sx={{ bgcolor: "#111E31", color: "white", p: 2, textAlign: "center" }}
//       / >
//       <List>
//         {users.length > 0
//           ? users.map((data) => (
//               <ListItem
//                 key={data.email}
//                 disabled
//                 sx={{ borderBottom: "1px solid #E0E0E0" }}
//               >
//                 <ListItemText primary={data.fullName} />
//               </ListItem>
//             ))
//           : (
//               <ListItem
//                 disabled
//                 sx={{ borderBottom: "1px solid #E0E0E0" }}
//               >
//                 <ListItemText primary={"No applicants found"} />
//               </ListItem>
//             ))}
//       </List>
//     </Box>
//   );
// }
