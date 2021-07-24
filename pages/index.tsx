import styles from "./index.module.css";
import { useEffect, useState } from "react";
import {
  getUploadedImages,
  Image,
  VoteValue,
  Vote,
  Favourite,
} from "../api/cats";
import { CatImageList, CatImage, Head } from "../components";
import { addVote, getVotes } from "../api/cats/votes";
import { groupBy, keyBy } from "lodash";
import {
  addFavourite,
  removeFavourite,
  getFavourites,
} from "../api/cats/favourites";
import { Typography, Fab, Box } from "@material-ui/core";
import { Add } from "@material-ui/icons";

export default function Home() {
  const [catImages, setCatImages] = useState<CatImage[]>();
  const [images, setImages] = useState<Image[]>();
  const [voteMap, setVotesMap] = useState<Record<string, Vote[]>>();
  const [favouriteMap, setFavouriteMap] = useState<Record<string, Favourite>>();

  const setVoteMapData = () => {
    getVotes().then((votes) => {
      const votesByIdAndValue = groupBy(
        votes,
        (votes) => votes.image_id + votes.value
      );
      setVotesMap(votesByIdAndValue);
    });
  };

  const setFavouriteMapData = () => {
    getFavourites().then((favourites) => {
      const favouriteMap = keyBy(favourites, (fav) => fav.image_id);
      setFavouriteMap(favouriteMap);
    });
  };

  useEffect(() => {
    getUploadedImages({
      limit: 2,
      page: 0,
    }).then(({ data, pagination }) => {
      setImages(data);
      console.log(pagination);
    });
    setVoteMapData();
    setFavouriteMapData();
  }, []);

  useEffect(() => {
    if (!images || !voteMap || !favouriteMap) return;

    const catImages: CatImage[] = images.map((image) => {
      return {
        image,
        score:
          (voteMap[image.id + VoteValue.Up]?.length || 0) -
          (voteMap[image.id + VoteValue.Down]?.length || 0),
        favourite: !!favouriteMap[image.id],
      };
    });

    setCatImages(catImages);
  }, [images, voteMap, favouriteMap]);

  return (
    <div className={styles.container}>
      <Head title="Catz" description="Your weird collection of cat pics" />

      <main className={styles.main}>
        <Box marginBottom="3rem">
          <Typography variant="h1">Your Kitty Catz</Typography>
        </Box>
        {catImages && (
          <CatImageList
            onFavourite={async ({ image, favourite }) => {
              if (!favouriteMap) return;
              //
              if (favourite && favouriteMap) {
                await removeFavourite(favouriteMap[image.id]?.id);
              } else {
                await addFavourite({
                  image_id: image.id,
                });
              }

              setFavouriteMapData();
            }}
            onUpVote={async (image) => {
              await addVote({ image_id: image.id, value: VoteValue.Up });
              setVoteMapData();
            }}
            onDownVote={async (image) => {
              await addVote({ image_id: image.id, value: VoteValue.Down });
              setVoteMapData();
            }}
            images={catImages}
          />
        )}
        <div className={styles.uploadBtn}>
          <Fab href="/upload" color="primary" aria-label="upload image">
            <Add />
          </Fab>
        </div>
      </main>
    </div>
  );
}
