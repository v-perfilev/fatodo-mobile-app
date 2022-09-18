import {AppDispatch, AsyncThunkConfig} from '../store';
import {User} from '../../models/User';
import {createAsyncThunk} from '@reduxjs/toolkit';
import UserService from '../../services/UserService';
import infoSlice from './infoSlice';
import ItemService from '../../services/ItemService';
import ChatService from '../../services/ChatService';
import CommentService from '../../services/CommentService';
import {GroupInfo} from '../../models/Group';
import {ItemInfo} from '../../models/Item';
import {FilterUtils} from '../../shared/utils/FilterUtils';
import {ChatInfo} from '../../models/Chat';
import {MessageInfo} from '../../models/Message';
import {CommentInfo, CommentThreadInfo} from '../../models/Comment';

const PREFIX = 'info/';

export class InfoActions {
  static handleUsers = (users: User[]) => async (dispatch: AppDispatch) => {
    dispatch(infoSlice.actions.handleUsers(users));
  };

  static incrementCommentCount = (targetId: string) => async (dispatch: AppDispatch) => {
    dispatch(infoSlice.actions.incrementCommentCount(targetId));
  };

  static incrementUnreadCommentCount = (targetId: string) => async (dispatch: AppDispatch) => {
    dispatch(infoSlice.actions.incrementUnreadCommentCount(targetId));
  };

  /*
  Users
  */
  static handleUserIdsThunk = createAsyncThunk<User[], string[], AsyncThunkConfig>(
    PREFIX + 'handleUserIds',
    async (ids, thunkAPI) => {
      const idsToLoad = extractIdsToLoad(ids, thunkAPI.getState().info.users);
      return idsToLoad.length > 0 ? (await UserService.getAllByIds(idsToLoad)).data : [];
    },
  );

  /*
  Groups
  */
  static handleGroupIdsThunk = createAsyncThunk<GroupInfo[], string[], AsyncThunkConfig>(
    PREFIX + 'handleGroupIds',
    async (ids, thunkAPI) => {
      const idsToLoad = extractIdsToLoad(ids, thunkAPI.getState().info.groups);
      return idsToLoad.length > 0 ? (await ItemService.getGroupInfoByIds(idsToLoad)).data : [];
    },
  );

  /*
  Items
  */
  static handleItemIdsThunk = createAsyncThunk<ItemInfo[], string[], AsyncThunkConfig>(
    PREFIX + 'handleItemIds',
    async (ids, thunkAPI) => {
      const idsToLoad = extractIdsToLoad(ids, thunkAPI.getState().info.items);
      return idsToLoad.length > 0 ? (await ItemService.getItemInfoByIds(idsToLoad)).data : [];
    },
  );

  /*
  Chats
  */
  static handleChatIdsThunk = createAsyncThunk<ChatInfo[], string[], AsyncThunkConfig>(
    PREFIX + 'handleChatIds',
    async (ids, thunkAPI) => {
      const idsToLoad = extractIdsToLoad(ids, thunkAPI.getState().info.chats);
      return idsToLoad.length > 0 ? (await ChatService.getChatInfoByIds(idsToLoad)).data : [];
    },
  );

  /*
  Messages
  */
  static handleMessageIdsThunk = createAsyncThunk<MessageInfo[], string[], AsyncThunkConfig>(
    PREFIX + 'handleMessageIds',
    async (ids, thunkAPI) => {
      const idsToLoad = extractIdsToLoad(ids, thunkAPI.getState().info.messages);
      return idsToLoad.length > 0 ? (await ChatService.getMessageInfoByIds(idsToLoad)).data : [];
    },
  );

  /*
  Comments
  */
  static handleCommentIdsThunk = createAsyncThunk<CommentInfo[], string[], AsyncThunkConfig>(
    PREFIX + 'handleCommentIds',
    async (ids, thunkAPI) => {
      const idsToLoad = extractIdsToLoad(ids, thunkAPI.getState().info.comments);
      return idsToLoad.length > 0 ? (await CommentService.getCommentInfoByIds(idsToLoad)).data : [];
    },
  );

  /*
  Comment Threads
  */
  static handleCommentThreadIdsThunk = createAsyncThunk<CommentThreadInfo[], string[], AsyncThunkConfig>(
    PREFIX + 'fetchCommentThreads',
    async (targetIds, thunkAPI) => {
      const idsToLoad = extractIdsToLoad(targetIds, thunkAPI.getState().info.commentThreads);
      return idsToLoad.length > 0 ? (await CommentService.getThreadInfoByTargetIds(idsToLoad)).data : [];
    },
  );

  static refreshCommentThreadsThunk = createAsyncThunk(PREFIX + 'refreshCommentThreads', async (targetId: string) => {
    await CommentService.refreshThread(targetId);
  });
}

const extractIdsToLoad = (ids: string[], entries: [string, any][]): string[] => {
  const existingIds = entries.map(([key, _]) => key);
  return ids
    .filter(FilterUtils.notUndefinedFilter)
    .filter(FilterUtils.notNullFilter)
    .filter(FilterUtils.uniqueFilter)
    .filter((id) => !existingIds.includes(id));
};
