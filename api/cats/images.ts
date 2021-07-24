import { catAPIFetch, catAPIPaginatedFetch, PaginationParams } from "./utils";
import { Image } from "./models";

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
