import queryString from "query-string";
import { camelCase, isString } from "lodash";

export type PaginationData = {
  paginationPage: number;
  paginationLimit: number;
  paginationCount: number;
};

const paginationHeaderKeys = [
  "pagination-page",
  "pagination-limit",
  "pagination-count",
];
export function getPagination(headers: Headers): PaginationData {
  return paginationHeaderKeys.reduce<PaginationData>((acc, key) => {
    const val = headers.get(key);
    return {
      ...acc,
      [camelCase(key)]: isString(val) ? +val : undefined,
    };
  }, {} as PaginationData);
}

type FetchParams = {
  path: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: Record<string, unknown> | FormData;
  queryParams?: Record<string, unknown>;
  isBodyFormData?: boolean;
};

function fetchData<T>({
  path,
  method,
  body,
  queryParams,
  isBodyFormData = false,
}: FetchParams): Promise<Response> {
  const query = queryParams ? `?${queryString.stringify(queryParams)}` : "";

  return fetch(
    `${process.env.NEXT_PUBLIC_CAT_API_URL as string}${path}${query}`,
    {
      method,
      headers: {
        "x-api-key": process.env.NEXT_PUBLIC_CAT_API_KEY as string,
        ...(body && !isBodyFormData
          ? { "Content-Type": "application/json" }
          : {}),
      },
      body: isBodyFormData ? (body as FormData) : JSON.stringify(body),
    }
  );
}

export async function catAPIFetch<T>(params: FetchParams): Promise<T> {
  const response = await fetchData<T>(params);

  return response.json();
}

export type PaginatedFetchData<T> = { data: T; pagination: PaginationData };
export async function catAPIPaginatedFetch<T>(
  params: FetchParams
): Promise<PaginatedFetchData<T>> {
  const response = await fetchData<T>(params);
  const data = (await response.json()) as T;

  return {
    data,
    pagination: getPagination(response.headers),
  };
}
