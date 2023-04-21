import { create } from "apisauce";

const api = create({
  baseURL: "https://7kaz5avhmv.us-east-2.awsapprunner.com/",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
