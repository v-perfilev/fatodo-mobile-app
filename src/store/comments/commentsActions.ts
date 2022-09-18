import CommentService from '../../services/CommentService';
import {UserAccount} from '../../models/User';
import {buildCommentFromDTO, buildCommentReaction, Comment, CommentReaction} from '../../models/Comment';
import {CommentDTO} from '../../models/dto/CommentDTO';
import commentsSlice from './commentsSlice';
import {AppDispatch, AsyncThunkConfig} from '../store';
import {AxiosResponse} from 'axios';
import {CommentUtils} from '../../shared/utils/CommentUtils';
import {PageableList} from '../../models/PageableList';
import {InfoActions} from '../info/infoActions';
import {SnackActions} from '../snack/snackActions';
import {createAsyncThunk} from '@reduxjs/toolkit';

const PREFIX = 'comments/';

export class CommentsActions {
  static init = (targetId: string) => async (dispatch: AppDispatch) => {
    dispatch(commentsSlice.actions.reset());
    dispatch(commentsSlice.actions.setTargetId(targetId));
  };

  static addComment = (comment: Comment) => async (dispatch: AppDispatch) => {
    dispatch(commentsSlice.actions.setComments([comment]));
  };

  static updateComment = (comment: Comment) => async (dispatch: AppDispatch) => {
    dispatch(commentsSlice.actions.setComments([comment]));
  };

  static updateCommentReaction = (commentReaction: CommentReaction) => async (dispatch: AppDispatch) => {
    dispatch(commentsSlice.actions.setCommentReaction(commentReaction));
  };

  static fetchCommentsThunk = createAsyncThunk<
    PageableList<Comment>,
    {targetId: string; offset: number},
    AsyncThunkConfig
  >(PREFIX + 'fetchComments', async ({targetId, offset}, thunkAPI) => {
    return await CommentService.getAllPageable(targetId, offset)
      .then((response: AxiosResponse<PageableList<Comment>>) => {
        const commentUserIds = CommentUtils.extractUserIds(response.data.data);
        thunkAPI.dispatch(InfoActions.handleUserIdsThunk(commentUserIds));
        return response.data;
      })
      .catch((response: AxiosResponse) => thunkAPI.rejectWithValue(response.status));
  });

  static refreshCommentsThunk = createAsyncThunk<PageableList<Comment>, string, AsyncThunkConfig>(
    PREFIX + 'refreshComments',
    async (targetId, thunkAPI) => {
      return await CommentService.getAllPageable(targetId, 0)
        .then((response: AxiosResponse<PageableList<Comment>>) => {
          const commentUserIds = CommentUtils.extractUserIds(response.data.data);
          thunkAPI.dispatch(InfoActions.handleUserIdsThunk(commentUserIds));
          return response.data;
        })
        .catch((response: AxiosResponse) => thunkAPI.rejectWithValue(response.status));
    },
  );

  static sendCommentThunk = createAsyncThunk<Comment, {targetId: string; dto: CommentDTO}, AsyncThunkConfig>(
    PREFIX + 'sendComment',
    async ({targetId, dto}, thunkAPI) => {
      const userId = thunkAPI.getState().auth.account.id;
      CommentService.addComment(targetId, dto);
      thunkAPI.dispatch(InfoActions.incrementCommentCount(targetId));
      return buildCommentFromDTO(dto, targetId, userId);
    },
  );

  static editCommentThunk = createAsyncThunk<Comment, {comment: Comment; dto: CommentDTO}, AsyncThunkConfig>(
    PREFIX + 'editComment',
    async ({comment, dto}, thunkAPI) => {
      const result = await CommentService.editComment(comment.id, dto);
      thunkAPI.dispatch(SnackActions.handleCode('comment.commentEdited', 'info'));
      return result.data;
    },
  );

  static deleteCommentThunk = createAsyncThunk<Comment, Comment, AsyncThunkConfig>(
    PREFIX + 'deleteComment',
    async (comment, thunkAPI) => {
      CommentService.deleteComment(comment.id);
      thunkAPI.dispatch(SnackActions.handleCode('comment.commentDeleted', 'info'));
      return {...comment, isDeleted: true};
    },
  );

  static noReactionThunk = createAsyncThunk<
    CommentReaction,
    {comment: Comment; account: UserAccount},
    AsyncThunkConfig
  >(PREFIX + 'noReaction', async ({comment, account}) => {
    CommentService.noneCommentReaction(comment.id);
    return buildCommentReaction(comment, account.id, 'NONE');
  });

  static likeReactionThunk = createAsyncThunk<
    CommentReaction,
    {comment: Comment; account: UserAccount},
    AsyncThunkConfig
  >(PREFIX + 'likeReaction', async ({comment, account}) => {
    CommentService.likeCommentReaction(comment.id);
    return buildCommentReaction(comment, account.id, 'LIKE');
  });

  static dislikeReactionThunk = createAsyncThunk<
    CommentReaction,
    {comment: Comment; account: UserAccount},
    AsyncThunkConfig
  >(PREFIX + 'dislikeReaction', async ({comment, account}) => {
    CommentService.dislikeCommentReaction(comment.id);
    return buildCommentReaction(comment, account.id, 'DISLIKE');
  });
}
