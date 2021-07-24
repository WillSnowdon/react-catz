import { useState } from "react";

interface UseFetchOptions<T, U> {
  fetch(params?: T): Promise<U>;
}

/**
 * Simple hook to match request states.  Could be improved with caching etc.
 * @param optsions
 */
export function useFetch<T, U>({ fetch }: UseFetchOptions<T, U>) {
  const [isDataInitialised, setDataInitialised] = useState(false);
  const [isFetching, setFetching] = useState(false);
  const [isRequestError, setIsRequestError] = useState(false);
  const [data, setData] = useState<U>();

  const doFetch = async (params?: T) => {
    setFetching(true);
    setIsRequestError(false);

    try {
      const response = await fetch(params);
      setData(response);
      setDataInitialised(true);
    } catch (e) {
      setIsRequestError(true);
    } finally {
      setFetching(false);
    }
  };

  return {
    data,
    isDataInitialised,
    isFetching,
    isRequestError,
    fetch: doFetch,
  };
}
