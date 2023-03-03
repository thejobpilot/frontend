import { User } from "jobpilot-backend";
import { useState, useEffect } from "react";
import useUserDB from "./useUserDB";

const emails = ["beigeletters@gmail.com", "john@google.com", "cookie@gmail.com", "applicant@gmail.com", "recruiter@gmail.com"]

export default function useAllUsers() {
//   const [users, setUsers] = useState<User[]>([]);

//   useEffect(() => {
//     async function fetchUsers() {
//       const fetchedUsers: User[] = await Promise.all(
//         emails.map((email) => {
//             const {data, isError} = useUserDB(email)
//             if (isError) return null;
//             return data;
//         })
//       );
//       setUsers(fetchedUsers.filter((user) => user !== null));
//     }

//     fetchUsers();
//   }, []);

  return emails;
}
