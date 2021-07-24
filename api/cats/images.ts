import { catAPIFetch } from "./utils";
import { Image } from "./models";

type GetUploadedImagesQuery = {
  limit: number;
  page: number;
};

export const getUploadedImages = (queryParams: GetUploadedImagesQuery) =>
  catAPIFetch<Image[]>({ path: "/images/", queryParams });

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
