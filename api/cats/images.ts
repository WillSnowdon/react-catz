import { catAPIFetch, catAPIPaginatedFetch } from "./utils";
import { Image } from "./models";

export type PaginationParams = {
  limit: number;
  page: number;
};

/**
 * Get paginated list of users uploaded cat images
 * @param queryParams
 */
export const getUploadedImages = (queryParams: PaginationParams) =>
  catAPIPaginatedFetch<Image[]>({ path: "/images/", queryParams });

/**
 * Upload a cat image to the cat api
 * @param file File to upload
 */
export const uploadImage = (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  return catAPIFetch<void>({
    path: "/images/upload/",
    method: "POST",
    body: formData,
    isBodyFormData: true,
  });
};
