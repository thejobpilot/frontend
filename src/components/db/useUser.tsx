import useSWR from "swr";

const fetcher = (url: RequestInfo | URL) =>
  fetch(url).then((res) => res.json());

export default function useUser(email: String) {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/db/get-user?email=${email}`,
    fetcher
  );

  return {
    data: data,
    isLoading,
    isError: error,
    mutate,
  };
}
