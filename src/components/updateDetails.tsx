import { User } from "gen/api";
import useSWR from "swr";

const fetcher = (url: RequestInfo | URL) =>
  fetch(url).then((res) => res.json());

export default function updateDetails(email: String, user: User) {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/update-user?email=${email}&username=john`,
    fetcher
  );

  return {
    data: data,
    isLoading,
    isError: error,
    mutate,
  };
}
