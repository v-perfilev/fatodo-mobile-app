import {Comment, CommentThreadInfo} from '../../models/Comment';

export type CommentsState = {
  targetId: string;
  comments: Comment[];
  threadsInfo: [string, CommentThreadInfo][];
  loading: boolean;
  moreLoading: boolean;
  allLoaded: boolean;
};
