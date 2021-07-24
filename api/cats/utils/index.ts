import queryString from "query-string";

type FetchParams = {
  path: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: Record<string, unknown> | FormData;
  queryParams?: Record<string, unknown>;
  isBodyFormData?: boolean;
};

export async function catAPIFetch<T>({
  path,
  method,
  body,
  queryParams,
  isBodyFormData = false,
}: FetchParams): Promise<T> {
  const query = queryParams ? `?${queryString.stringify(queryParams)}` : "";

  const response = await fetch(
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

  return response.json();
}
