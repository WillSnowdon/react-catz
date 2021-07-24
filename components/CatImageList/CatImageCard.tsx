import { FC } from "react";
import { Image } from "../../api/cats";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  IconButton,
} from "@material-ui/core";
import {
  Favorite,
  ThumbDown,
  ThumbUp,
  FavoriteBorderOutlined,
} from "@material-ui/icons";
import styles from "./CatImageCard.module.css";

export type CatImageCardProps = {
  image: Image;
  score: number;
  favourite: boolean;
  onFavourite: () => void;
  onDownVote: () => void;
  onUpVote: () => void;
};

export const CatImageCard: FC<CatImageCardProps> = ({
  favourite,
  image,
  score,
  onDownVote,
  onFavourite,
  onUpVote,
}) => {
  return (
    <Card>
      <CardMedia
        className={styles.cardMedia}
        image={image.url}
        title={`Cat ${image.id}`}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          Score: {score}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={onFavourite}>
          {favourite ? (
            <Favorite className={styles.favIcon} />
          ) : (
            <FavoriteBorderOutlined className={styles.favIconOutlined} />
          )}
        </IconButton>
        <IconButton aria-label="down vote" onClick={onDownVote}>
          <ThumbDown />
        </IconButton>
        <IconButton aria-label="up vote" onClick={onUpVote}>
          <ThumbUp />
        </IconButton>
      </CardActions>
    </Card>
  );
};
