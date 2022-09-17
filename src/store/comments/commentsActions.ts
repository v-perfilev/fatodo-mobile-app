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

  static sendCommentThunk = createAsyncThunk<void, {targetId: string; dto: CommentDTO}, AsyncThunkConfig>(
    PREFIX + 'sendComment',
    async ({targetId, dto}, thunkAPI) => {
      const userId = thunkAPI.getState().auth.account.id;
      const comment = buildCommentFromDTO(dto, targetId, userId);
      thunkAPI.dispatch(commentsSlice.actions.setComments([comment]));
      CommentService.addComment(targetId, dto);
    },
  );

  static editCommentThunk = createAsyncThunk<void, {comment: Comment; dto: CommentDTO}, AsyncThunkConfig>(
    PREFIX + 'editComment',
    async ({comment, dto}, thunkAPI) => {
      const result = await CommentService.editComment(comment.id, dto);
      thunkAPI.dispatch(commentsSlice.actions.setComments([result.data]));
      thunkAPI.dispatch(SnackActions.handleCode('comment.commentEdited', 'info'));
    },
  );

  static deleteCommentThunk = createAsyncThunk<void, Comment, AsyncThunkConfig>(
    PREFIX + 'deleteComment',
    async (comment, thunkAPI) => {
      CommentService.deleteComment(comment.id);
      thunkAPI.dispatch(commentsSlice.actions.setComments([{...comment, isDeleted: true}]));
      thunkAPI.dispatch(SnackActions.handleCode('comment.commentDeleted', 'info'));
    },
  );

  static noReactionThunk = createAsyncThunk<void, {comment: Comment; account: UserAccount}, AsyncThunkConfig>(
    PREFIX + 'noReaction',
    async ({comment, account}, thunkAPI) => {
      CommentService.noneCommentReaction(comment.id);
      const reaction = buildCommentReaction(comment, account.id, 'NONE');
      thunkAPI.dispatch(commentsSlice.actions.setCommentReaction(reaction));
    },
  );

  static likeReactionThunk = createAsyncThunk<void, {comment: Comment; account: UserAccount}, AsyncThunkConfig>(
    PREFIX + 'likeReaction',
    async ({comment, account}, thunkAPI) => {
      CommentService.likeCommentReaction(comment.id);
      const reaction = buildCommentReaction(comment, account.id, 'LIKE');
      thunkAPI.dispatch(commentsSlice.actions.setCommentReaction(reaction));
    },
  );

  static dislikeReactionThunk = createAsyncThunk<void, {comment: Comment; account: UserAccount}, AsyncThunkConfig>(
    PREFIX + 'dislikeReaction',
    async ({comment, account}, thunkAPI) => {
      CommentService.dislikeCommentReaction(comment.id);
      const reaction = buildCommentReaction(comment, account.id, 'DISLIKE');
      thunkAPI.dispatch(commentsSlice.actions.setCommentReaction(reaction));
    },
  );

  static addCommentAction = createAsyncThunk<void, Comment, AsyncThunkConfig>(
    PREFIX + 'addCommentAction',
    async (comment, thunkAPI) => {
      thunkAPI.dispatch(commentsSlice.actions.setComments([comment]));
    },
  );
}
