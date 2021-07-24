import { catAPIFetch } from "./utils";
import { Favourite } from "./models";

export const getFavourites = () =>
  catAPIFetch<Favourite[]>({ path: "/favourites/" });

type AddFavouriteRequestBody = {
  image_id: string;
  sub_id?: string;
};

type AddFavouriteResponseBody = {
  message: string;
  id: string;
};

export const addFavourite = (body: AddFavouriteRequestBody) =>
  catAPIFetch<AddFavouriteResponseBody>({
    path: "/favourites/",
    method: "POST",
    body,
  });

type RemoveFavouriteResponseBody = {
  message: string;
};

export const removeFavourite = (favouriteId: string) =>
  catAPIFetch<RemoveFavouriteResponseBody>({
    path: `/favourites/${favouriteId}`,
    method: "DELETE",
  });
