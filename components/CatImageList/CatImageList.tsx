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
import { CatImageCard } from "./CatImageCard";

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
          const { image } = catImg;
          return (
            <Grid key={image.id} item lg={3} md={6} sm={6} xs={12}>
              <CatImageCard
                {...catImg}
                onDownVote={() => onDownVote(image)}
                onUpVote={() => onUpVote(image)}
                onFavourite={() => onFavourite(catImg)}
              />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};
