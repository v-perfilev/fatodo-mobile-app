import {Comment} from '../../models/Comment';

export type CommentsState = {
  targetId: string;
  comments: Comment[];
  allLoaded: boolean;
  loading: boolean;
  shouldLoad: boolean;
};
