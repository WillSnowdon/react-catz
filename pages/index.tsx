import styles from "./index.module.css";
import { useEffect, useState } from "react";
import { Image, VoteValue } from "../api/cats";
import { CatImageList, Head, CatImage } from "../components";
import { addVote } from "../api/cats/votes";
import { addFavourite, removeFavourite } from "../api/cats/favourites";
import {
  Typography,
  Fab,
  Box,
  LinearProgress,
  Snackbar,
} from "@material-ui/core";
import { Alert, Pagination } from "@material-ui/lab";
import { Add } from "@material-ui/icons";
import { usePaginatedCatImages } from "../hooks";

export default function Home() {
  // TODO: Add dropdown for configurable limit
  const [limit] = useState(4);
  const [showErrorSnack, setShowErrorSnack] = useState(false);
  const {
    catImages,
    favouriteMap,
    paginationData,
    fetchingImages,
    imageRequestError,
    imagesInitialised,
    fetchImages,
    fetchFavourites,
    fetchVotes,
  } = usePaginatedCatImages();

  useEffect(() => {
    fetchImages({
      limit,
      page: 0,
    });

    fetchVotes();
    fetchFavourites();
  }, []);

  const toggleSnack = () => setShowErrorSnack(!showErrorSnack);
  const onAddVote = async (image: Image, value: VoteValue) => {
    try {
      await addVote({ image_id: image.id, value });
      fetchVotes();
    } catch {
      setShowErrorSnack(true);
    }
  };
  const onUpdateFavourite = async ({ image, favourite }: CatImage) => {
    if (!favouriteMap) return;

    try {
      if (favourite && favouriteMap) {
        await removeFavourite(favouriteMap[image.id]?.id);
      } else {
        await addFavourite({
          image_id: image.id,
        });
      }
      fetchFavourites();
    } catch {
      setShowErrorSnack(true);
    }
  };

  return (
    <div className={styles.container}>
      <Head title="Catz" description="Your weird collection of cat pics" />

      <main className={styles.main}>
        <Typography gutterBottom variant="h1">
          Your Kitty Catz
        </Typography>

        {/* TODO: Add favourite/vote refresh handling */}
        {imageRequestError && (
          <Box marginBottom={2}>
            <Alert severity="error">
              Oops, there has been an issue loading your catz.
            </Alert>
          </Box>
        )}
        {fetchingImages && (
          <Box
            position="fixed"
            top={0}
            left={0}
            sx={{ width: "100%", marginBottom: "2rem" }}
          >
            <LinearProgress />
          </Box>
        )}
        {imagesInitialised && catImages && catImages.length === 0 && (
          <Alert severity="warning">
            :( You've not uploaded any kitties yet. Click the plus button to
            upload some.
          </Alert>
        )}
        {catImages && paginationData && (
          <>
            <CatImageList
              onFavourite={onUpdateFavourite}
              onUpVote={(image) => onAddVote(image, VoteValue.Up)}
              onDownVote={(image) => onAddVote(image, VoteValue.Down)}
              images={catImages}
            />
            <Box marginTop={3}>
              <Pagination
                count={Math.ceil(
                  paginationData.paginationCount /
                    paginationData.paginationLimit
                )}
                /** API pages zero indexed */
                page={paginationData.paginationPage + 1}
                onChange={(e, page) => fetchImages({ page: page - 1, limit })}
              />
            </Box>
          </>
        )}
        <Snackbar
          open={showErrorSnack}
          autoHideDuration={6000}
          onClose={toggleSnack}
        >
          <Alert onClose={toggleSnack} severity="error">
            Error updating cat status
          </Alert>
        </Snackbar>
        <div className={styles.uploadBtn}>
          <Fab href="/upload" color="primary" aria-label="upload image">
            <Add />
          </Fab>
        </div>
      </main>
    </div>
  );
}
