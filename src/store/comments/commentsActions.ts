import {createAsyncThunk} from '@reduxjs/toolkit';
import CommentService from '../../services/CommentService';
import {UserAccount} from '../../models/User';
import {Comment, CommentReactions} from '../../models/Comment';
import {CommentDTO} from '../../models/dto/CommentDTO';
import commentsSlice from './commentsSlice';
import snackSlice from '../snack/snackSlice';
import {AppDispatch} from '../store';
import {AxiosResponse} from 'axios';
import {CommentUtils} from '../../shared/utils/CommentUtils';
import {PageableList} from '../../models/PageableList';
import {InfoThunks} from '../info/infoActions';

export class CommentsActions {
  static init = (targetId: string) => async (dispatch: AppDispatch) => {
    dispatch(commentsSlice.actions.init(targetId));
  };

  static addCommentWs = (comment: Comment) => async (dispatch: AppDispatch) => {
    dispatch(commentsSlice.actions.addCommentWs(comment));
  };

  static updateCommentWs = (comment: Comment) => async (dispatch: AppDispatch) => {
    dispatch(commentsSlice.actions.updateCommentWs(comment));
  };

  static updateCommentReactionsWs = (commentReactions: CommentReactions) => async (dispatch: AppDispatch) => {
    dispatch(commentsSlice.actions.updateCommentReactionsWs(commentReactions));
  };
}

enum TYPES {
  FETCH_COMMENTS = 'comments/fetchComments',
  SEND_COMMENT = 'comments/sendComment',
  EDIT_COMMENT = 'comments/editComment',
  DELETE_COMMENT = 'comments/deleteComment',
  NO_REACTION = 'comments/noReaction',
  LIKE_REACTION = 'comments/likeReaction',
  DISLIKE_REACTION = 'comments/dislikeReaction',
}

export class CommentsThunks {
  static fetchComments = createAsyncThunk(
    TYPES.FETCH_COMMENTS,
    async ({targetId, offset}: {targetId: string; offset: number}, thunkAPI) => {
      return await CommentService.getAllPageable(targetId, offset)
        .then((response: AxiosResponse<PageableList<Comment>>) => {
          const commentUserIds = CommentUtils.extractUserIds(response.data.data);
          thunkAPI.dispatch(InfoThunks.handleUserIds(commentUserIds));
          return response.data;
        })
        .catch((response: AxiosResponse) => thunkAPI.rejectWithValue(response.status));
    },
  );

  static sendComment = createAsyncThunk(
    TYPES.SEND_COMMENT,
    async ({targetId, dto}: {targetId: string; dto: CommentDTO}, thunkAPI) => {
      const result = await CommentService.addComment(targetId, dto);
      thunkAPI.dispatch(commentsSlice.actions.addComment(result.data));
    },
  );

  static editComment = createAsyncThunk(
    TYPES.EDIT_COMMENT,
    async ({comment, dto}: {comment: Comment; dto: CommentDTO}, thunkAPI) => {
      const result = await CommentService.editComment(comment.id, dto);
      thunkAPI.dispatch(commentsSlice.actions.editComment(result.data));
      thunkAPI.dispatch(snackSlice.actions.handleCode({code: 'comment.commentEdited', variant: 'info'}));
    },
  );

  static deleteComment = createAsyncThunk(TYPES.DELETE_COMMENT, async (comment: Comment, thunkAPI) => {
    await CommentService.deleteComment(comment.id);
    const updatedComment = {...comment, isDeleted: true} as Comment;
    thunkAPI.dispatch(commentsSlice.actions.editComment(updatedComment));
    thunkAPI.dispatch(snackSlice.actions.handleCode({code: 'comment.commentDeleted', variant: 'info'}));
  });

  static noReaction = createAsyncThunk(
    TYPES.NO_REACTION,
    async ({comment, account}: {comment: Comment; account: UserAccount}, thunkAPI) => {
      await CommentService.noneCommentReaction(comment.id);
      thunkAPI.dispatch(commentsSlice.actions.deleteCommentReaction({comment, account}));
    },
  );

  static likeReaction = createAsyncThunk(
    TYPES.LIKE_REACTION,
    async ({comment, account}: {comment: Comment; account: UserAccount}, thunkAPI) => {
      await CommentService.likeCommentReaction(comment.id);
      thunkAPI.dispatch(commentsSlice.actions.setCommentReaction({comment, reactionType: 'LIKE', account}));
    },
  );

  static dislikeReaction = createAsyncThunk(
    TYPES.DISLIKE_REACTION,
    async ({comment, account}: {comment: Comment; account: UserAccount}, thunkAPI) => {
      await CommentService.dislikeCommentReaction(comment.id);
      thunkAPI.dispatch(commentsSlice.actions.setCommentReaction({comment, reactionType: 'DISLIKE', account}));
    },
  );
}
