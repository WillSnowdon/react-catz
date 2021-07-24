import { Category } from "./Category.model";
import { Breed } from "./Breed.model";

type Nullable<T> = T | null;

export type Image = {
  id: string;
  url: string;
  sub_id: Nullable<string>;
  created_at: string;
  width: number;
  height: number;
  original_filename: string;
  categories?: Category[];
  breeds?: Breed[];
};
