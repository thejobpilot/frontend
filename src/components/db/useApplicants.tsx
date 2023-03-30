import useSWR from "swr";

const fetcher = (url: RequestInfo | URL) =>
  fetch(url).then((res) => res.json());

export default function useApplicants() {
  const search = { userType: "applicant" };

  const { data, error, isLoading, mutate } = useSWR(
    `/api/db/get-users?search=${JSON.stringify(search)}`,
    fetcher
  );

  return {
    applicants: data,
    isLoading,
    isError: error,
    mutate,
  };
}
