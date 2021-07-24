import { FC } from "react";
import { Image } from "../../api/cats";
import {
  Card,
  CardMedia,
  Typography,
  CardContent,
  CardActions,
  IconButton,
  Grid,
} from "@material-ui/core";
import {
  Favorite,
  FavoriteBorderOutlined,
  ThumbUp,
  ThumbDown,
} from "@material-ui/icons";
import styles from "./CatImageList.module.css";

export type CatImage = {
  score: number;
  favourite: boolean;
  image: Image;
};

export type CatImageListProps = {
  images: CatImage[];
  onFavourite(image: CatImage): void;
  onUpVote(image: Image): void;
  onDownVote(image: Image): void;
};

export const CatImageList: FC<CatImageListProps> = ({
  images,
  onDownVote,
  onFavourite,
  onUpVote,
}) => {
  return (
    <div className={styles.catImageList}>
      <Grid container spacing={2}>
        {images.map((catImg) => {
          const { image, score, favourite } = catImg;
          return (
            <Grid key={image.id} item lg={3} md={6} sm={6} xs={12}>
              <Card>
                <CardMedia
                  style={{
                    width: "100%",
                    paddingTop: "100%",
                    backgroundSize: "contain",
                    backgroundColor: "black",
                  }}
                  image={image.url}
                  title={`Cat ${catImg.image.id}`}
                />
                <CardContent>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Score: {score}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton
                    aria-label="add to favorites"
                    onClick={() => onFavourite(catImg)}
                  >
                    {favourite ? (
                      <Favorite className={styles.favIcon} />
                    ) : (
                      <FavoriteBorderOutlined
                        className={styles.favIconOutlined}
                      />
                    )}
                  </IconButton>
                  <IconButton
                    aria-label="down vote"
                    onClick={() => onDownVote(image)}
                  >
                    <ThumbDown />
                  </IconButton>
                  <IconButton
                    aria-label="up vote"
                    onClick={() => onUpVote(image)}
                  >
                    <ThumbUp />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};
