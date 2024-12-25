import { default as SWR, SWRResponse } from 'swr';

interface SWRData {
    [key: string]: any;
};

const refreshInterval = 3 * 1000;

const fetcher = async (href: string): Promise<any | null> => {
    try {
        const response = await fetch(href);
        if (!response.ok) throw new Error();
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const useSWR = <T = SWRData>(url: string): SWRResponse<T | null, any> => {
    return SWR<T | null>(url, fetcher, {refreshInterval});
}