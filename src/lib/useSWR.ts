import { SWRData } from "@/interfaces";
import { SWRConfig } from '@k4itrunconfig';

import useSWR, { SWRResponse } from 'swr';
import axios from 'axios';

axios.defaults.withCredentials = true;

axios.interceptors.request.use((config) => {
  return config;
}, (error) => {
  return Promise.reject(error);
});

const SWR = <T = SWRData>(url: string): SWRResponse<T | null, any> => {
  const fetcher = (href: string) =>
    axios
      .get(href)
      .then((res) => res.data)
      .catch((error) => {
        return null;
      });

  return useSWR<T | null>(url, fetcher, { refreshInterval: SWRConfig.interval });
}

export default SWR;
