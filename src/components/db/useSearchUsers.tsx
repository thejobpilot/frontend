import useSWR from "swr";

const fetcher = (url: RequestInfo | URL) =>
  fetch(url).then((res) => res.json());

export default function useSearchUsers(
  search?: string | undefined | null,
  fields?: string | undefined | null,
  filter?: string | undefined | null,
  or?: string | undefined | null,
  sort?: string | undefined | null
) {

  // NOTICE: if search query param is present, then filter and or query params will be ignored.

  const { data, error, isLoading, mutate } = useSWR(
    `/api/db/get-users?fields=
    ${fields ? fields : ""}&s=
    ${search ? search : ""}&filter=
    ${filter ? filter : ""}&or=
    ${or ? or : ""}&sort=
    ${sort ? sort : ""}`,
    fetcher
  );

  return {
    data: data,
    isLoading,
    isError: error,
    mutate,
  };
}
