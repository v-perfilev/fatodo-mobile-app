import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from '../../models/User';
import {InfoState} from './infoType';
import {InfoThunks} from './infoActions';
import {InfoUtils} from '../../shared/utils/InfoUtils';

const initialState: InfoState = {
  users: [],
  loadingUserIds: [],
  groups: [],
  loadingGroupIds: [],
  items: [],
  loadingItemIds: [],
  chats: [],
  loadingChatIds: [],
  messages: [],
  loadingMessageIds: [],
  comments: [],
  loadingCommentIds: [],
};

const infoSlice = createSlice({
  name: 'info',
  initialState,
  reducers: {
    handleUsers: (state: InfoState, action: PayloadAction<User[]>) => {
      const users = InfoUtils.prepareFulfilledContent(state.users, action.payload);
      return {...state, users};
    },
  },
  extraReducers: (builder) => {
    /*
    fetchUserIds
    */
    builder.addCase(InfoThunks.fetchUsers.pending, (state: InfoState, action) => {
      const loadingUserIds = InfoUtils.preparePendingLoadingIds(state.loadingUserIds, action.meta.arg);
      return {...state, loadingUserIds};
    });
    builder.addCase(InfoThunks.fetchUsers.fulfilled, (state: InfoState, action) => {
      const users = InfoUtils.prepareFulfilledContent(state.users, action.payload);
      const loadingUserIds = InfoUtils.prepareFinishedLoadingIds(state.loadingUserIds, action.meta.arg);
      return {...state, users, loadingUserIds};
    });
    builder.addCase(InfoThunks.fetchUsers.rejected, (state: InfoState, action) => {
      const loadingUserIds = InfoUtils.prepareFinishedLoadingIds(state.loadingUserIds, action.meta.arg);
      return {...state, loadingUserIds};
    });

    /*
    fetchGroupIds
    */
    builder.addCase(InfoThunks.fetchGroups.pending, (state: InfoState, action) => {
      const loadingGroupIds = InfoUtils.preparePendingLoadingIds(state.loadingGroupIds, action.meta.arg);
      return {...state, loadingGroupIds};
    });
    builder.addCase(InfoThunks.fetchGroups.fulfilled, (state: InfoState, action) => {
      const groups = InfoUtils.prepareFulfilledContent(state.groups, action.payload);
      const loadingGroupIds = InfoUtils.prepareFinishedLoadingIds(state.loadingGroupIds, action.meta.arg);
      return {...state, groups, loadingGroupIds};
    });
    builder.addCase(InfoThunks.fetchGroups.rejected, (state: InfoState, action) => {
      const loadingGroupIds = InfoUtils.prepareFinishedLoadingIds(state.loadingGroupIds, action.meta.arg);
      return {...state, loadingGroupIds};
    });

    /*
    fetchItemIds
    */
    builder.addCase(InfoThunks.fetchItems.pending, (state: InfoState, action) => {
      const loadingItemIds = InfoUtils.preparePendingLoadingIds(state.loadingItemIds, action.meta.arg);
      return {...state, loadingItemIds};
    });
    builder.addCase(InfoThunks.fetchItems.fulfilled, (state: InfoState, action) => {
      const items = InfoUtils.prepareFulfilledContent(state.items, action.payload);
      const loadingItemIds = InfoUtils.prepareFinishedLoadingIds(state.loadingItemIds, action.meta.arg);
      return {...state, items, loadingItemIds};
    });
    builder.addCase(InfoThunks.fetchItems.rejected, (state: InfoState, action) => {
      const loadingItemIds = InfoUtils.prepareFinishedLoadingIds(state.loadingItemIds, action.meta.arg);
      return {...state, loadingItemIds};
    });

    /*
    fetchChatIds
    */
    builder.addCase(InfoThunks.fetchChats.pending, (state: InfoState, action) => {
      const loadingChatIds = InfoUtils.preparePendingLoadingIds(state.loadingChatIds, action.meta.arg);
      return {...state, loadingChatIds};
    });
    builder.addCase(InfoThunks.fetchChats.fulfilled, (state: InfoState, action) => {
      const chats = InfoUtils.prepareFulfilledContent(state.chats, action.payload);
      const loadingChatIds = InfoUtils.prepareFinishedLoadingIds(state.loadingChatIds, action.meta.arg);
      return {...state, chats, loadingChatIds};
    });
    builder.addCase(InfoThunks.fetchChats.rejected, (state: InfoState, action) => {
      const loadingChatIds = InfoUtils.prepareFinishedLoadingIds(state.loadingChatIds, action.meta.arg);
      return {...state, loadingChatIds};
    });

    /*
    fetchMessageIds
    */
    builder.addCase(InfoThunks.fetchMessages.pending, (state: InfoState, action) => {
      const loadingMessageIds = InfoUtils.preparePendingLoadingIds(state.loadingMessageIds, action.meta.arg);
      return {...state, loadingMessageIds};
    });
    builder.addCase(InfoThunks.fetchMessages.fulfilled, (state: InfoState, action) => {
      const messages = InfoUtils.prepareFulfilledContent(state.messages, action.payload);
      const loadingMessageIds = InfoUtils.prepareFinishedLoadingIds(state.loadingMessageIds, action.meta.arg);
      return {...state, messages, loadingMessageIds};
    });
    builder.addCase(InfoThunks.fetchMessages.rejected, (state: InfoState, action) => {
      const loadingMessageIds = InfoUtils.prepareFinishedLoadingIds(state.loadingMessageIds, action.meta.arg);
      return {...state, loadingMessageIds};
    });

    /*
    fetchCommentIds
    */
    builder.addCase(InfoThunks.fetchComments.pending, (state: InfoState, action) => {
      const loadingCommentIds = InfoUtils.preparePendingLoadingIds(state.loadingCommentIds, action.meta.arg);
      return {...state, loadingCommentIds};
    });
    builder.addCase(InfoThunks.fetchComments.fulfilled, (state: InfoState, action) => {
      const comments = InfoUtils.prepareFulfilledContent(state.comments, action.payload);
      const loadingCommentIds = InfoUtils.prepareFinishedLoadingIds(state.loadingCommentIds, action.meta.arg);
      return {...state, comments, loadingCommentIds};
    });
    builder.addCase(InfoThunks.fetchComments.rejected, (state: InfoState, action) => {
      const loadingCommentIds = InfoUtils.prepareFinishedLoadingIds(state.loadingCommentIds, action.meta.arg);
      return {...state, loadingCommentIds};
    });
  },
});

export default infoSlice;
