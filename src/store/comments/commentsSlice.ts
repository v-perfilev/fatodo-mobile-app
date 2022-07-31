import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CommentsState} from './commentsType';
import {CommentsThunks} from './commentsActions';
import {CommentUtils} from '../../shared/utils/CommentUtils';
import {buildCommentReaction, Comment, CommentReactions, CommentReactionType} from '../../models/Comment';
import {ArrayUtils} from '../../shared/utils/ArrayUtils';
import {UserAccount} from '../../models/User';

interface CommentPayload {
  comment: Comment;
  account: UserAccount;
}

interface CommentReactionPayload {
  comment: Comment;
  reactionType: CommentReactionType;
  account: UserAccount;
}

const initialState: CommentsState = {
  targetId: undefined,
  comments: [],
  threadsInfo: [],
  loading: false,
  moreLoading: false,
  allLoaded: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    init: (state: CommentsState, action: PayloadAction<string>) => {
      const targetId = action.payload;
      const comments = [] as Comment[];
      const allLoaded = false;
      return {...initialState, targetId, comments, allLoaded};
    },

    addComment: (state: CommentsState, action: PayloadAction<Comment>) => {
      const comment = action.payload;
      let comments = state.comments;
      if (state.targetId === comment.targetId) {
        const commentInThread = ArrayUtils.findValueWithId(state.comments, comment);
        comments = commentInThread
          ? ArrayUtils.replaceValue(state.comments, commentInThread, comment)
          : CommentUtils.filterComments([comment, ...state.comments]);
      }
      return {...state, comments};
    },

    editComment: (state: CommentsState, action: PayloadAction<Comment>) => {
      const comment = action.payload;
      let comments = state.comments;
      if (state.targetId === comment.targetId) {
        comments = ArrayUtils.updateValueWithId(comments, comment);
      }
      return {...state, comments};
    },

    updateCommentReactions: (state: CommentsState, action: PayloadAction<CommentReactions>) => {
      const targetId = action.payload.targetId;
      const commentId = action.payload.targetId;
      const reactions = action.payload.reactions;
      let comments = state.comments;
      if (state.targetId === targetId) {
        const commentInList = ArrayUtils.findValueById(state.comments, commentId);
        const updatedComment = {...commentInList, reactions};
        comments = ArrayUtils.updateValueWithId(state.comments, updatedComment);
      }
      return {...state, comments};
    },

    deleteCommentReaction: (state: CommentsState, action: PayloadAction<CommentPayload>) => {
      const comment = action.payload.comment;
      const account = action.payload.account;
      const reaction = comment.reactions.find((s) => s.userId === account.id);
      let comments = state.comments;
      if (reaction) {
        const updatedReactions = ArrayUtils.deleteValue(comment.reactions, reaction);
        const updatedComment = {...comment, reactions: updatedReactions};
        comments = ArrayUtils.updateValueWithId(comments, updatedComment);
      }
      return {...state, comments};
    },

    setCommentReaction: (state: CommentsState, action: PayloadAction<CommentReactionPayload>) => {
      const comment = action.payload.comment;
      const newReactionType = action.payload.reactionType;
      const account = action.payload.account;
      const reaction = comment.reactions.find((s) => s.userId === account.id);
      let comments = state.comments;
      let updatedReactions = comment.reactions;
      if (reaction) {
        updatedReactions = ArrayUtils.deleteValue(updatedReactions, reaction);
      }
      const newReaction = buildCommentReaction(comment.id, account.id, newReactionType);
      updatedReactions = [...updatedReactions, newReaction];
      const updatedComment = {...comment, reactions: updatedReactions};
      comments = ArrayUtils.updateValueWithId(comments, updatedComment);
      return {...state, comments};
    },
  },
  extraReducers: (builder) => {
    /*
    fetchComments
    */
    builder.addCase(CommentsThunks.fetchComments.pending, (state: CommentsState, action) => {
      const initialLoading = action.meta.arg.offset === 0;
      const loading = initialLoading;
      const moreLoading = !initialLoading;
      return {...state, loading, moreLoading};
    });
    builder.addCase(CommentsThunks.fetchComments.fulfilled, (state: CommentsState, action) => {
      const newComments = action.payload.data;
      const count = action.payload.count;
      const comments = CommentUtils.filterComments([...state.comments, ...newComments]);
      const loading = false;
      const moreLoading = false;
      const allLoaded = comments.length === count;
      return {...state, comments, loading, moreLoading, allLoaded};
    });
    builder.addCase(CommentsThunks.fetchComments.rejected, (state: CommentsState) => {
      const loading = false;
      const moreLoading = false;
      return {...state, loading, moreLoading};
    });

    /*
    refreshComments
    */
    builder.addCase(CommentsThunks.refreshComments.pending, (state: CommentsState) => {
      const comments = [] as Comment[];
      const loading = true;
      const moreLoading = false;
      return {...state, comments, loading, moreLoading};
    });

    /*
    fetchThreadInfo
    */
    builder.addCase(CommentsThunks.fetchThreadInfo.fulfilled, (state: CommentsState, action) => {
      const newInfo = action.payload;
      const commentThreads = CommentUtils.addInfo(state.threadsInfo, newInfo);
      return {...state, commentThreads};
    });

    builder.addCase(CommentsThunks.refreshThread.fulfilled, (state: CommentsState, action) => {
      const targetId = action.meta.arg;
      const commentThreads = CommentUtils.refreshInfo(state.threadsInfo, targetId);
      return {...state, commentThreads};
    });
  },
});

export default commentsSlice;
