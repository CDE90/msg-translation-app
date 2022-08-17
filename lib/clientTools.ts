import useSWR from "swr";

// @ts-ignore
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export function useMessage(id: string) {
    let { data, error } = useSWR(`/api/get/${id}`, fetcher);

    if (data && "error" in data) {
        console.error(data.error);
    }

    return {
        message: data,
        isLoading: !error && !data,
        isError: !!error,
    };
}
