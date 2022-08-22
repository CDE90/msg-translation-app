import useSWR from "swr";
import type { Message } from "./DBTools";

// @ts-ignore
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export function useMessage(id: string): {message: Message, isLoading: boolean, isError: boolean} {
    let { data, error } = useSWR(`/api/get/${id}`, fetcher);

    let isError = false;

    if (data && "error" in data) {
        // console.error({error: data.error});
        isError = true;
    } else if (error) {
        // console.error({error});
        isError = true;
    }

    return {
        message: data,
        isLoading: !error && !data,
        isError
    };
}
