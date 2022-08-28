import {createAsyncThunk} from '@reduxjs/toolkit';
import CommentService from '../../services/CommentService';
import {UserAccount} from '../../models/User';
import {buildCommentFromDTO, Comment, CommentReaction} from '../../models/Comment';
import {CommentDTO} from '../../models/dto/CommentDTO';
import commentsSlice from './commentsSlice';
import snackSlice from '../snack/snackSlice';
import {AppDispatch, RootState} from '../store';
import {AxiosResponse} from 'axios';
import {CommentUtils} from '../../shared/utils/CommentUtils';
import {PageableList} from '../../models/PageableList';
import {InfoActions} from '../info/infoActions';

const PREFIX = 'comments/';

export class CommentsActions {
  static init = (targetId: string) => async (dispatch: AppDispatch) => {
    dispatch(commentsSlice.actions.init(targetId));
  };

  static updateComment = (comment: Comment) => async (dispatch: AppDispatch) => {
    dispatch(commentsSlice.actions.editComment(comment));
  };

  static updateCommentReactions = (commentReaction: CommentReaction) => async (dispatch: AppDispatch) => {
    dispatch(commentsSlice.actions.updateCommentReactions(commentReaction));
  };

  static fetchCommentsThunk = createAsyncThunk(
    PREFIX + 'fetchComments',
    async ({targetId, offset}: {targetId: string; offset: number}, thunkAPI) => {
      return await CommentService.getAllPageable(targetId, offset)
        .then((response: AxiosResponse<PageableList<Comment>>) => {
          const commentUserIds = CommentUtils.extractUserIds(response.data.data);
          thunkAPI.dispatch(InfoActions.handleUserIdsThunk(commentUserIds));
          return response.data;
        })
        .catch((response: AxiosResponse) => thunkAPI.rejectWithValue(response.status));
    },
  );

  static refreshCommentsThunk = createAsyncThunk(PREFIX + 'refreshComments', async (targetId: string, thunkAPI) => {
    thunkAPI.dispatch(CommentsActions.fetchCommentsThunk({targetId, offset: 0}));
  });

  static sendCommentThunk = createAsyncThunk(
    PREFIX + 'sendComment',
    async ({targetId, dto}: {targetId: string; dto: CommentDTO}, thunkAPI) => {
      const state = thunkAPI.getState() as RootState;
      const userId = state.auth.account.id;
      const comment = buildCommentFromDTO(dto, targetId, userId);
      thunkAPI.dispatch(commentsSlice.actions.addComment(comment));
      CommentService.addComment(targetId, dto);
    },
  );

  static editCommentThunk = createAsyncThunk(
    PREFIX + 'editComment',
    async ({comment, dto}: {comment: Comment; dto: CommentDTO}, thunkAPI) => {
      const result = await CommentService.editComment(comment.id, dto);
      thunkAPI.dispatch(commentsSlice.actions.editComment(result.data));
      thunkAPI.dispatch(snackSlice.actions.handleCode({code: 'comment.commentEdited', variant: 'info'}));
    },
  );

  static deleteCommentThunk = createAsyncThunk(PREFIX + 'deleteComment', async (comment: Comment, thunkAPI) => {
    CommentService.deleteComment(comment.id);
    thunkAPI.dispatch(commentsSlice.actions.editComment({...comment, isDeleted: true}));
    thunkAPI.dispatch(snackSlice.actions.handleCode({code: 'comment.commentDeleted', variant: 'info'}));
  });

  static noReactionThunk = createAsyncThunk(
    PREFIX + 'noReaction',
    async ({comment, account}: {comment: Comment; account: UserAccount}, thunkAPI) => {
      CommentService.noneCommentReaction(comment.id);
      thunkAPI.dispatch(commentsSlice.actions.deleteCommentReaction({comment, account}));
    },
  );

  static likeReactionThunk = createAsyncThunk(
    PREFIX + 'likeReaction',
    async ({comment, account}: {comment: Comment; account: UserAccount}, thunkAPI) => {
      CommentService.likeCommentReaction(comment.id);
      thunkAPI.dispatch(commentsSlice.actions.setCommentReaction({comment, reactionType: 'LIKE', account}));
    },
  );

  static dislikeReactionThunk = createAsyncThunk(
    PREFIX + 'dislikeReaction',
    async ({comment, account}: {comment: Comment; account: UserAccount}, thunkAPI) => {
      CommentService.dislikeCommentReaction(comment.id);
      thunkAPI.dispatch(commentsSlice.actions.setCommentReaction({comment, reactionType: 'DISLIKE', account}));
    },
  );

  static fetchThreadInfoThunk = createAsyncThunk(PREFIX + 'fetchThreadInfo', async (targetIds: string[]) => {
    const response = await CommentService.getThreadInfoByTargetIds(targetIds);
    return response.data;
  });

  static refreshThreadThunk = createAsyncThunk(PREFIX + 'refreshThread', async (targetId: string) => {
    await CommentService.refreshThread(targetId);
  });

  static addCommentAction = createAsyncThunk(PREFIX + 'addCommentAction', async (comment: Comment, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const account = state.auth.account;
    const targetId = comment.targetId;
    const isOwnComment = CommentUtils.isOwnComment(comment, account);
    thunkAPI.dispatch(commentsSlice.actions.addComment(comment));
    thunkAPI.dispatch(commentsSlice.actions.increaseCounter({targetId, isOwnComment}));
  });
}
