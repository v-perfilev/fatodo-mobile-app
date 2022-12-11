import {Comment} from '../../models/Comment';

export type CommentsState = {
  targetId: string;
  comments: Comment[];
  createdIds: string[];
  allLoaded: boolean;
  loading: boolean;
  shouldLoad: boolean;
};
