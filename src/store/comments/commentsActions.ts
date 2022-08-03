import {createAsyncThunk} from '@reduxjs/toolkit';
import CommentService from '../../services/CommentService';
import {UserAccount} from '../../models/User';
import {buildCommentFromDTO, Comment, CommentReactions} from '../../models/Comment';
import {CommentDTO} from '../../models/dto/CommentDTO';
import commentsSlice from './commentsSlice';
import snackSlice from '../snack/snackSlice';
import {AppDispatch, RootState} from '../store';
import {AxiosResponse} from 'axios';
import {CommentUtils} from '../../shared/utils/CommentUtils';
import {PageableList} from '../../models/PageableList';
import {InfoThunks} from '../info/infoActions';

export class CommentsActions {
  static init = (targetId: string) => async (dispatch: AppDispatch) => {
    dispatch(commentsSlice.actions.init(targetId));
  };

  static addComment = (comment: Comment, account: UserAccount) => async (dispatch: AppDispatch) => {
    const targetId = comment.targetId;
    const isOwnComment = CommentUtils.isOwnComment(comment, account);
    dispatch(commentsSlice.actions.addComment(comment));
    dispatch(commentsSlice.actions.increaseCounter({targetId, isOwnComment}));
  };

  static updateComment = (comment: Comment) => async (dispatch: AppDispatch) => {
    dispatch(commentsSlice.actions.editComment(comment));
  };

  static updateCommentReactions = (commentReactions: CommentReactions) => async (dispatch: AppDispatch) => {
    dispatch(commentsSlice.actions.updateCommentReactions(commentReactions));
  };
}

enum TYPES {
  FETCH_COMMENTS = 'comments/fetchComments',
  REFRESH_COMMENTS = 'comments/refreshComments',
  SEND_COMMENT = 'comments/sendComment',
  EDIT_COMMENT = 'comments/editComment',
  DELETE_COMMENT = 'comments/deleteComment',
  NO_REACTION = 'comments/noReaction',
  LIKE_REACTION = 'comments/likeReaction',
  DISLIKE_REACTION = 'comments/dislikeReaction',
  FETCH_THREAD_INFO = 'comments/fetchThreadInfo',
  REFRESH_THREAD = 'comments/refreshThread',
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

  static refreshComments = createAsyncThunk(TYPES.REFRESH_COMMENTS, async (targetId: string, thunkAPI) => {
    thunkAPI.dispatch(CommentsThunks.fetchComments({targetId, offset: 0}));
  });

  static sendComment = createAsyncThunk(
    TYPES.SEND_COMMENT,
    async ({targetId, dto}: {targetId: string; dto: CommentDTO}, thunkAPI) => {
      const state = thunkAPI.getState() as RootState;
      const userId = state.auth.account.id;
      const comment = buildCommentFromDTO(dto, targetId, userId);
      thunkAPI.dispatch(commentsSlice.actions.addComment(comment));
      CommentService.addComment(targetId, dto);
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
    CommentService.deleteComment(comment.id);
    thunkAPI.dispatch(commentsSlice.actions.editComment({...comment, isDeleted: true}));
    thunkAPI.dispatch(snackSlice.actions.handleCode({code: 'comment.commentDeleted', variant: 'info'}));
  });

  static noReaction = createAsyncThunk(
    TYPES.NO_REACTION,
    async ({comment, account}: {comment: Comment; account: UserAccount}, thunkAPI) => {
      CommentService.noneCommentReaction(comment.id);
      thunkAPI.dispatch(commentsSlice.actions.deleteCommentReaction({comment, account}));
    },
  );

  static likeReaction = createAsyncThunk(
    TYPES.LIKE_REACTION,
    async ({comment, account}: {comment: Comment; account: UserAccount}, thunkAPI) => {
      CommentService.likeCommentReaction(comment.id);
      thunkAPI.dispatch(commentsSlice.actions.setCommentReaction({comment, reactionType: 'LIKE', account}));
    },
  );

  static dislikeReaction = createAsyncThunk(
    TYPES.DISLIKE_REACTION,
    async ({comment, account}: {comment: Comment; account: UserAccount}, thunkAPI) => {
      CommentService.dislikeCommentReaction(comment.id);
      thunkAPI.dispatch(commentsSlice.actions.setCommentReaction({comment, reactionType: 'DISLIKE', account}));
    },
  );

  /*
  ThreadInfo
  */
  static fetchThreadInfo = createAsyncThunk(TYPES.FETCH_THREAD_INFO, async (targetIds: string[]) => {
    const response = await CommentService.getThreadInfoByTargetIds(targetIds);
    return response.data;
  });

  static refreshThread = createAsyncThunk(TYPES.REFRESH_THREAD, async (targetId: string) => {
    await CommentService.refreshThread(targetId);
  });
}
