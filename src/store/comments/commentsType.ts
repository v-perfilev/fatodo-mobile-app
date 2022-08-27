import {Comment, CommentThreadInfo} from '../../models/Comment';

export type CommentsState = {
  parentId: string;
  targetId: string;
  comments: Comment[];
  threadsInfo: [string, CommentThreadInfo][];
  loading: boolean;
  moreLoading: boolean;
  allLoaded: boolean;
};
