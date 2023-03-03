import useSWR from "swr";

const fetcher = (url: RequestInfo | URL) =>
  fetch(url).then((res) => res.json());

export default function useUserDB(email?: string | undefined | null) {
  const { data, error, isLoading, mutate } = useSWR(email ?
    `/api/db/get-user?email=${email}` : null,
    fetcher
  );

  return {
    data: data,
    isLoading,
    isError: error,
    mutate,
  };
}
