import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CommentsState} from './commentsType';
import {CommentsActions} from './commentsActions';
import {Comment, CommentReaction} from '../../models/Comment';
import {ArrayUtils} from '../../shared/utils/ArrayUtils';
import {FilterUtils} from '../../shared/utils/FilterUtils';
import {ComparatorUtils} from '../../shared/utils/ComparatorUtils';

const initialState: CommentsState = {
  targetId: undefined,
  comments: [],
  allLoaded: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    reset: (state: CommentsState) => {
      Object.assign(state, initialState);
    },

    setTargetId: (state: CommentsState, action: PayloadAction<string>) => {
      state.targetId = action.payload;
    },

    resetComments: (state: CommentsState) => {
      state.comments = [];
    },

    setComments: (state: CommentsState, action: PayloadAction<Comment[]>) => {
      const comments = action.payload;
      const targetId = comments.length > 0 && comments[0].targetId;
      if (comments.length > 0 && state.targetId === targetId) {
        state.comments = filterComments([...comments, ...state.comments]);
      }
    },

    setCommentReaction: (state: CommentsState, action: PayloadAction<CommentReaction>) => {
      const reaction = action.payload;
      if (state.targetId === reaction.targetId) {
        const comment = state.comments.find((c) => c.id === reaction.commentId);
        if (comment) {
          comment.reactions =
            reaction.type === 'NONE'
              ? ArrayUtils.deleteValueWithUserId(comment.reactions, reaction)
              : filterReactions([reaction, ...comment.reactions]);
          state.comments = filterComments([comment, ...state.comments]);
        }
      }
    },

    calculateAllLoaded: (state: CommentsState, action: PayloadAction<number>) => {
      state.allLoaded = state.comments.length === action.payload;
    },
  },
  extraReducers: (builder) => {
    /*
    fetchComments
    */
    builder.addCase(CommentsActions.fetchCommentsThunk.fulfilled, (state, action) => {
      commentsSlice.caseReducers.setComments(state, {...action, payload: action.payload.data});
      commentsSlice.caseReducers.calculateAllLoaded(state, {...action, payload: action.payload.count});
    });

    /*
    refreshComments
    */
    builder.addCase(CommentsActions.refreshCommentsThunk.fulfilled, (state, action) => {
      commentsSlice.caseReducers.resetComments(state);
      commentsSlice.caseReducers.setComments(state, {...action, payload: action.payload.data});
      commentsSlice.caseReducers.calculateAllLoaded(state, {...action, payload: action.payload.count});
    });
  },
});

const filterComments = (comments: Comment[]): Comment[] => {
  return comments
    .filter(FilterUtils.uniqueByIdOrUserIdAndTextAndDateFilter)
    .sort(ComparatorUtils.createdAtComparator)
    .reverse();
};

const filterReactions = (reactions: CommentReaction[]): CommentReaction[] => {
  return reactions.filter(FilterUtils.uniqueByUserIdFilter).sort(ComparatorUtils.createdAtComparator);
};

export default commentsSlice;
