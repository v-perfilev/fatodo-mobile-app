import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CommentsState} from './commentsType';
import {CommentsThunks} from './commentsActions';
import {CommentUtils} from '../../shared/utils/CommentUtils';
import {buildCommentReaction, Comment, CommentReactions, CommentReactionType} from '../../models/Comment';
import {ArrayUtils} from '../../shared/utils/ArrayUtils';
import {UserAccount} from '../../models/User';

interface CommentIsOwnPayload {
  comment: Comment;
  isOwnComment: boolean;
}

interface CommentAccountPayload {
  comment: Comment;
  account: UserAccount;
}

interface CommentReactionAccountPayload {
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
      state.targetId = action.payload;
      state.comments = [];
      state.allLoaded = false;
    },

    addComment: (state: CommentsState, action: PayloadAction<CommentIsOwnPayload>) => {
      const comment = action.payload.comment;
      const isOwnComment = action.payload.isOwnComment;
      if (state.targetId === comment.targetId) {
        state.comments = CommentUtils.filterComments([comment, ...state.comments]);
      }
      state.threadsInfo = CommentUtils.increaseInfo(state.threadsInfo, comment.targetId, isOwnComment);
    },

    editComment: (state: CommentsState, action: PayloadAction<Comment>) => {
      const comment = action.payload;
      if (state.targetId === comment.targetId) {
        state.comments = ArrayUtils.updateValueWithId(state.comments, comment);
      }
    },

    updateCommentReactions: (state: CommentsState, action: PayloadAction<CommentReactions>) => {
      const targetId = action.payload.targetId;
      const commentId = action.payload.targetId;
      const reactions = action.payload.reactions;
      if (state.targetId === targetId) {
        const commentInList = ArrayUtils.findValueById(state.comments, commentId);
        const updatedComment = {...commentInList, reactions};
        state.comments = ArrayUtils.updateValueWithId(state.comments, updatedComment);
      }
    },

    deleteCommentReaction: (state: CommentsState, action: PayloadAction<CommentAccountPayload>) => {
      const comment = action.payload.comment;
      const account = action.payload.account;
      const reaction = comment.reactions.find((s) => s.userId === account.id);
      if (reaction) {
        const updatedReactions = ArrayUtils.deleteValue(comment.reactions, reaction);
        const updatedComment = {...comment, reactions: updatedReactions};
        state.comments = ArrayUtils.updateValueWithId(state.comments, updatedComment);
      }
    },

    setCommentReaction: (state: CommentsState, action: PayloadAction<CommentReactionAccountPayload>) => {
      const comment = action.payload.comment;
      const newReactionType = action.payload.reactionType;
      const account = action.payload.account;
      const reaction = comment.reactions.find((s) => s.userId === account.id);
      let oldReactions = reaction ? ArrayUtils.deleteValue(comment.reactions, reaction) : comment.reactions;
      const newReaction = buildCommentReaction(comment.id, account.id, newReactionType);
      const updatedComment = {...comment, reactions: [...oldReactions, newReaction]};
      state.comments = ArrayUtils.updateValueWithId(state.comments, updatedComment);
    },
  },
  extraReducers: (builder) => {
    /*
    fetchComments
    */
    builder.addCase(CommentsThunks.fetchComments.pending, (state: CommentsState, action) => {
      const initialLoading = action.meta.arg.offset === 0;
      state.loading = initialLoading;
      state.moreLoading = !initialLoading;
    });
    builder.addCase(CommentsThunks.fetchComments.fulfilled, (state: CommentsState, action) => {
      const newComments = action.payload.data;
      const count = action.payload.count;
      state.comments = CommentUtils.filterComments([...state.comments, ...newComments]);
      state.loading = false;
      state.moreLoading = false;
      state.allLoaded = state.comments.length === count;
    });
    builder.addCase(CommentsThunks.fetchComments.rejected, (state: CommentsState) => {
      state.loading = false;
      state.moreLoading = false;
    });

    /*
    refreshComments
    */
    builder.addCase(CommentsThunks.refreshComments.pending, (state: CommentsState) => {
      state.comments = [];
      state.loading = true;
      state.moreLoading = false;
    });

    /*
    fetchThreadInfo
    */
    builder.addCase(CommentsThunks.fetchThreadInfo.fulfilled, (state: CommentsState, action) => {
      const newInfo = action.payload;
      state.threadsInfo = CommentUtils.addInfo(state.threadsInfo, newInfo);
    });

    builder.addCase(CommentsThunks.refreshThread.fulfilled, (state: CommentsState, action) => {
      const targetId = action.meta.arg;
      state.threadsInfo = CommentUtils.refreshInfo(state.threadsInfo, targetId);
    });
  },
});

export default commentsSlice;
