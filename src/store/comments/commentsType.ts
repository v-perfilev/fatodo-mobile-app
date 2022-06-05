import {Comment} from '../../models/Comment';

export type CommentsState = {
  targetId: string;
  comments: Comment[];
  loading: boolean;
  moreLoading: boolean;
  allLoaded: boolean;
};
