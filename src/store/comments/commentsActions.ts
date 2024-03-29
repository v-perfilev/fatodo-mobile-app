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
import {v4 as uuidV4} from 'uuid';

const PREFIX = 'comments/';

export class CommentsActions {
  static afterLogout = () => async (dispatch: AppDispatch) => {
    dispatch(commentsSlice.actions.reset());
  };

  static afterRefresh = () => async (dispatch: AppDispatch) => {
    dispatch(commentsSlice.actions.setShouldLoad(true));
  };

  static init = (targetId: string) => async (dispatch: AppDispatch) => {
    dispatch(commentsSlice.actions.reset());
    dispatch(commentsSlice.actions.setTargetId(targetId));
  };

  static updateComment = (comment: Comment) => async (dispatch: AppDispatch) => {
    dispatch(commentsSlice.actions.setComments([comment]));
  };

  static deleteComment = (comment: Comment) => async (dispatch: AppDispatch) => {
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
    const response = await CommentService.getAllPageable(targetId, offset)
      .then((response) => response)
      .catch(() => ({data: {data: [], count: 0}}));
    const commentUserIds = CommentUtils.extractUserIds(response.data.data);
    thunkAPI.dispatch(InfoActions.handleUserIdsThunk(commentUserIds));
    return response.data;
  });

  static fetchCommentsAfterRestartThunk = createAsyncThunk<
    PageableList<Comment>,
    {targetId: string; offset: number},
    AsyncThunkConfig
  >(PREFIX + 'fetchCommentsAfterRestart', async ({targetId, offset}, thunkAPI) => {
    const response = await CommentService.getAllPageable(targetId, offset)
      .then((response) => response)
      .catch(() => ({data: {data: [], count: 0}}));
    const commentUserIds = CommentUtils.extractUserIds(response.data.data);
    thunkAPI.dispatch(InfoActions.handleUserIdsThunk(commentUserIds));
    return response.data;
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
      const id = uuidV4();
      const comment = buildCommentFromDTO(dto, id, targetId, userId);
      thunkAPI.dispatch(commentsSlice.actions.addCreatedId(id));
      thunkAPI.dispatch(commentsSlice.actions.setComments([comment]));
      CommentService.addComment(targetId, dto);
    },
  );

  static editCommentThunk = createAsyncThunk<void, {comment: Comment; dto: CommentDTO}, AsyncThunkConfig>(
    PREFIX + 'editComment',
    async ({comment, dto}, thunkAPI) => {
      const editedComment = {...comment, ...dto} as Comment;
      thunkAPI.dispatch(commentsSlice.actions.setComments([editedComment]));
      await CommentService.editComment(comment.id, dto);
      thunkAPI.dispatch(SnackActions.handleCode('comment.commentEdited', 'info'));
    },
  );

  static deleteCommentThunk = createAsyncThunk<void, Comment, AsyncThunkConfig>(
    PREFIX + 'deleteComment',
    async (comment, thunkAPI) => {
      const deletedComment = {...comment, isDeleted: true} as Comment;
      thunkAPI.dispatch(commentsSlice.actions.setComments([deletedComment]));
      await CommentService.deleteComment(comment.id);
      thunkAPI.dispatch(SnackActions.handleCode('comment.commentDeleted', 'info'));
    },
  );

  static noReactionThunk = createAsyncThunk<void, {comment: Comment; account: UserAccount}, AsyncThunkConfig>(
    PREFIX + 'noReaction',
    async ({comment, account}, thunkAPI) => {
      const reaction = buildCommentReaction(comment, account.id, 'NONE');
      thunkAPI.dispatch(commentsSlice.actions.setCommentReaction(reaction));
      CommentService.noneCommentReaction(comment.id);
    },
  );

  static likeReactionThunk = createAsyncThunk<void, {comment: Comment; account: UserAccount}, AsyncThunkConfig>(
    PREFIX + 'likeReaction',
    async ({comment, account}, thunkAPI) => {
      const reaction = buildCommentReaction(comment, account.id, 'LIKE');
      thunkAPI.dispatch(commentsSlice.actions.setCommentReaction(reaction));
      CommentService.likeCommentReaction(comment.id);
    },
  );

  static dislikeReactionThunk = createAsyncThunk<void, {comment: Comment; account: UserAccount}, AsyncThunkConfig>(
    PREFIX + 'dislikeReaction',
    async ({comment, account}, thunkAPI) => {
      const reaction = buildCommentReaction(comment, account.id, 'DISLIKE');
      thunkAPI.dispatch(commentsSlice.actions.setCommentReaction(reaction));
      CommentService.dislikeCommentReaction(comment.id);
    },
  );

  static addCommentThunk = createAsyncThunk<void, Comment, AsyncThunkConfig>(
    PREFIX + 'addComment',
    async (comment, thunkAPI) => {
      const account = thunkAPI.getState().auth.account;
      if (comment.userId === account.id) {
        const comments = thunkAPI.getState().comments.comments;
        const createdIds = thunkAPI.getState().comments.createdIds;
        const stubComment = comments.find(
          (c) => c.userId === account.id && createdIds.includes(c.id) && c.text === comment.text,
        );
        if (stubComment) {
          thunkAPI.dispatch(commentsSlice.actions.removeCreatedId(stubComment.id));
          thunkAPI.dispatch(commentsSlice.actions.removeComment(stubComment));
        }
      }
      thunkAPI.dispatch(commentsSlice.actions.setComments([comment]));
    },
  );
}
