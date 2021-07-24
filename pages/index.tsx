import styles from "./index.module.css";
import { useEffect } from "react";
import { VoteValue } from "../api/cats";
import { CatImageList, CatImage, Head } from "../components";
import { addVote } from "../api/cats/votes";
import { addFavourite, removeFavourite } from "../api/cats/favourites";
import { Typography, Fab, Box } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { usePaginatedCatImages } from "../hooks";

export default function Home() {
  const {
    catImages,
    favouriteMap,
    fetchImages,
    fetchFavourites,
    fetchVotes,
  } = usePaginatedCatImages();

  useEffect(() => {
    fetchImages({
      limit: 2,
      page: 0,
    });

    fetchVotes();
    fetchFavourites();
  }, []);

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

              fetchFavourites();
            }}
            onUpVote={async (image) => {
              await addVote({ image_id: image.id, value: VoteValue.Up });
              fetchVotes();
            }}
            onDownVote={async (image) => {
              await addVote({ image_id: image.id, value: VoteValue.Down });
              fetchVotes();
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
