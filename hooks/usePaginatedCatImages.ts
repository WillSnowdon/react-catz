import { useState, useEffect } from "react";
import {
  Favourite,
  Image,
  Vote,
  getUploadedImages,
  VoteValue,
} from "../api/cats";
import { PaginationParams } from "../api/cats/utils/";
import { getVotes } from "../api/cats/votes";
import { groupBy, keyBy } from "lodash";
import { getFavourites } from "../api/cats/favourites";
import { useFetch } from "./useFetch";
import { PaginatedFetchData } from "../api/cats/utils";
import { CatImage } from "../components";

export function usePaginatedCatImages() {
  const {
    fetch: fetchImages,
    data: images,
    isRequestError: imageRequestError,
    isDataInitialised: imagesInitialised,
    isFetching: fetchingImages,
  } = useFetch<PaginationParams, PaginatedFetchData<Image[]>>({
    fetch: getUploadedImages,
  });
  const { fetch: fetchVotes, data: votes } = useFetch({ fetch: getVotes });
  const { fetch: fetchFavourites, data: favourites } = useFetch({
    fetch: getFavourites,
  });
  const [voteMap, setVotesMap] = useState<Record<string, Vote[]>>({});
  const [favouriteMap, setFavouriteMap] = useState<Record<string, Favourite>>(
    {}
  );

  useEffect(() => {
    const favouriteMap = keyBy(favourites, (fav) => fav.image_id);
    setFavouriteMap(favouriteMap);
  }, [favourites]);

  useEffect(() => {
    const votesByIdAndValue = groupBy(
      votes,
      (votes) => votes.image_id + votes.value
    );
    setVotesMap(votesByIdAndValue);
  }, [votes]);

  return {
    catImages:
      images && images.data
        ? images.data.map<CatImage>((image) => {
            return {
              image,
              score:
                (voteMap[image.id + VoteValue.Up]?.length || 0) -
                (voteMap[image.id + VoteValue.Down]?.length || 0),
              favourite: !!favouriteMap[image.id],
            };
          })
        : [],
    paginationData: images?.pagination,
    favouriteMap,
    voteMap,
    imageRequestError,
    imagesInitialised,
    fetchingImages,
    fetchImages,
    fetchFavourites,
    fetchVotes,
  };
}
