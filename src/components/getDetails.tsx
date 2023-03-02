import useSWR from "swr";

const fetcher = (url: RequestInfo | URL) =>
  fetch(url).then((res) => res.json());

export default function getDetails(email: String) {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/get-user?email=${email}`,
    fetcher
  );

  return {
    data: data,
    isLoading,
    isError: error,
    mutate,
  };
}
