import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CommentsState} from './commentsType';
import {CommentsActions} from './commentsActions';
import {CommentUtils} from '../../shared/utils/CommentUtils';
import {buildCommentReaction, Comment, CommentReaction, CommentReactionType} from '../../models/Comment';
import {ArrayUtils} from '../../shared/utils/ArrayUtils';
import {UserAccount} from '../../models/User';

interface CommentAccountPayload {
  comment: Comment;
  account: UserAccount;
}

interface CommentReactionAccountPayload {
  comment: Comment;
  reactionType: CommentReactionType;
  account: UserAccount;
}

interface CommentCounterPayload {
  targetId: string;
  isOwnComment: boolean;
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
    reset: (state: CommentsState) => {
      Object.assign(state, initialState);
    },

    init: (state: CommentsState, action: PayloadAction<string>) => {
      state.targetId = action.payload;
      state.comments = [];
      state.allLoaded = false;
    },

    addComment: (state: CommentsState, action: PayloadAction<Comment>) => {
      const comment = action.payload;
      if (state.targetId === comment.targetId) {
        const commentInList = CommentUtils.findComment(state.comments, comment);
        state.comments = commentInList
          ? ArrayUtils.replaceValue(state.comments, commentInList, comment)
          : CommentUtils.filterComments([comment, ...state.comments]);
      }
    },

    editComment: (state: CommentsState, action: PayloadAction<Comment>) => {
      const comment = action.payload;
      if (state.targetId === comment.targetId) {
        state.comments = ArrayUtils.updateValueWithId(state.comments, comment);
      }
    },

    updateCommentReactions: (state: CommentsState, action: PayloadAction<CommentReaction>) => {
      const reaction = action.payload;
      if (state.targetId === reaction.targetId) {
        const commentInList: Comment = ArrayUtils.findValueById(state.comments, reaction.commentId);
        if (commentInList) {
          let reactions = commentInList.reactions.filter((r) => r.userId !== reaction.userId);
          if (reaction.type !== 'NONE') {
            reactions.push(reaction);
          }
          const updatedComment = {...commentInList, reactions};
          state.comments = ArrayUtils.updateValueWithId(state.comments, updatedComment);
        }
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
      const newReaction = buildCommentReaction(comment, account.id, newReactionType);
      const updatedComment = {...comment, reactions: [...oldReactions, newReaction]};
      state.comments = ArrayUtils.updateValueWithId(state.comments, updatedComment);
    },

    increaseCounter: (state: CommentsState, action: PayloadAction<CommentCounterPayload>) => {
      const targetId = action.payload.targetId;
      const isOwnComment = action.payload.isOwnComment;
      state.threadsInfo = CommentUtils.increaseInfo(state.threadsInfo, targetId, isOwnComment);
    },
  },
  extraReducers: (builder) => {
    /*
    fetchComments
    */
    builder.addCase(CommentsActions.fetchCommentsThunk.pending, (state: CommentsState, action) => {
      const initialLoading = action.meta.arg.offset === 0;
      state.loading = initialLoading;
      state.moreLoading = !initialLoading;
    });
    builder.addCase(CommentsActions.fetchCommentsThunk.fulfilled, (state: CommentsState, action) => {
      const newComments = action.payload.data;
      const count = action.payload.count;
      state.comments = CommentUtils.filterComments([...state.comments, ...newComments]);
      state.loading = false;
      state.moreLoading = false;
      state.allLoaded = state.comments.length === count;
    });
    builder.addCase(CommentsActions.fetchCommentsThunk.rejected, (state: CommentsState) => {
      state.loading = false;
      state.moreLoading = false;
    });

    /*
    fetchThreadInfo
    */
    builder.addCase(CommentsActions.fetchThreadInfoThunk.fulfilled, (state: CommentsState, action) => {
      const newInfo = action.payload;
      state.threadsInfo = CommentUtils.addInfo(state.threadsInfo, newInfo);
    });

    builder.addCase(CommentsActions.refreshThreadThunk.fulfilled, (state: CommentsState, action) => {
      const targetId = action.meta.arg;
      state.threadsInfo = CommentUtils.refreshInfo(state.threadsInfo, targetId);
    });
  },
});

export default commentsSlice;
