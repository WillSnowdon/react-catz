export enum VoteValue {
  Down,
  Up,
}
export type Vote = {
  value: VoteValue;
  image_id: string;
  sub_id?: string;
  created_at: string;
  id: string;
  country_code: string;
};
