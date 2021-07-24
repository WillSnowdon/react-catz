import { catAPIFetch } from "./utils";
import { Vote, VoteValue } from "./models";

export const getVotes = () => catAPIFetch<Vote[]>({ path: "/votes/" });

type AddVoteRequestBody = {
  image_id: string;
  sub_id?: string;
  value: VoteValue;
};

type AddVoteResponseBody = {
  message: string;
  id: string;
};

export const addVote = (body: AddVoteRequestBody) =>
  catAPIFetch<AddVoteResponseBody>({
    path: "/votes/",
    method: "POST",
    body,
  });

type RemoveVoteResponseBody = {
  message: string;
};

export const removeVote = (voteId: string) =>
  catAPIFetch<RemoveVoteResponseBody>({
    path: `/votes/${voteId}`,
    method: "DELETE",
  });
