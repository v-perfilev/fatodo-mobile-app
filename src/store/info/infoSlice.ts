import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from '../../models/User';
import {InfoState} from './infoType';
import {InfoThunks} from './infoActions';
import {InfoUtils} from '../../shared/utils/InfoUtils';

const initialState: InfoState = {
  users: [],
  groups: [],
  items: [],
  chats: [],
  messages: [],
  comments: [],
  loadingUserIds: [],
  loadingGroupIds: [],
  loadingItemIds: [],
  loadingChatIds: [],
  loadingMessageIds: [],
  loadingCommentIds: [],
};

const infoSlice = createSlice({
  name: 'info',
  initialState,
  reducers: {
    handleUsers: (state: InfoState, action: PayloadAction<User[]>) => {
      state.users = InfoUtils.prepareFulfilledContent(state.users, action.payload);
    },
  },
  extraReducers: (builder) => {
    /*
    fetchUserIds
    */
    builder.addCase(InfoThunks.fetchUsers.pending, (state: InfoState, action) => {
      state.loadingUserIds = InfoUtils.preparePendingLoadingIds(state.loadingUserIds, action.meta.arg);
    });
    builder.addCase(InfoThunks.fetchUsers.fulfilled, (state: InfoState, action) => {
      state.users = InfoUtils.prepareFulfilledContent(state.users, action.payload);
      state.loadingUserIds = InfoUtils.prepareFinishedLoadingIds(state.loadingUserIds, action.meta.arg);
    });
    builder.addCase(InfoThunks.fetchUsers.rejected, (state: InfoState, action) => {
      state.loadingUserIds = InfoUtils.prepareFinishedLoadingIds(state.loadingUserIds, action.meta.arg);
    });

    /*
    fetchGroupIds
    */
    builder.addCase(InfoThunks.fetchGroups.pending, (state: InfoState, action) => {
      state.loadingGroupIds = InfoUtils.preparePendingLoadingIds(state.loadingGroupIds, action.meta.arg);
    });
    builder.addCase(InfoThunks.fetchGroups.fulfilled, (state: InfoState, action) => {
      state.groups = InfoUtils.prepareFulfilledContent(state.groups, action.payload);
      state.loadingGroupIds = InfoUtils.prepareFinishedLoadingIds(state.loadingGroupIds, action.meta.arg);
    });
    builder.addCase(InfoThunks.fetchGroups.rejected, (state: InfoState, action) => {
      state.loadingGroupIds = InfoUtils.prepareFinishedLoadingIds(state.loadingGroupIds, action.meta.arg);
    });

    /*
    fetchItemIds
    */
    builder.addCase(InfoThunks.fetchItems.pending, (state: InfoState, action) => {
      state.loadingItemIds = InfoUtils.preparePendingLoadingIds(state.loadingItemIds, action.meta.arg);
    });
    builder.addCase(InfoThunks.fetchItems.fulfilled, (state: InfoState, action) => {
      state.items = InfoUtils.prepareFulfilledContent(state.items, action.payload);
      state.loadingItemIds = InfoUtils.prepareFinishedLoadingIds(state.loadingItemIds, action.meta.arg);
    });
    builder.addCase(InfoThunks.fetchItems.rejected, (state: InfoState, action) => {
      state.loadingItemIds = InfoUtils.prepareFinishedLoadingIds(state.loadingItemIds, action.meta.arg);
    });

    /*
    fetchChatIds
    */
    builder.addCase(InfoThunks.fetchChats.pending, (state: InfoState, action) => {
      state.loadingChatIds = InfoUtils.preparePendingLoadingIds(state.loadingChatIds, action.meta.arg);
    });
    builder.addCase(InfoThunks.fetchChats.fulfilled, (state: InfoState, action) => {
      state.chats = InfoUtils.prepareFulfilledContent(state.chats, action.payload);
      state.loadingChatIds = InfoUtils.prepareFinishedLoadingIds(state.loadingChatIds, action.meta.arg);
    });
    builder.addCase(InfoThunks.fetchChats.rejected, (state: InfoState, action) => {
      state.loadingChatIds = InfoUtils.prepareFinishedLoadingIds(state.loadingChatIds, action.meta.arg);
    });

    /*
    fetchMessageIds
    */
    builder.addCase(InfoThunks.fetchMessages.pending, (state: InfoState, action) => {
      state.loadingMessageIds = InfoUtils.preparePendingLoadingIds(state.loadingMessageIds, action.meta.arg);
    });
    builder.addCase(InfoThunks.fetchMessages.fulfilled, (state: InfoState, action) => {
      state.messages = InfoUtils.prepareFulfilledContent(state.messages, action.payload);
      state.loadingMessageIds = InfoUtils.prepareFinishedLoadingIds(state.loadingMessageIds, action.meta.arg);
    });
    builder.addCase(InfoThunks.fetchMessages.rejected, (state: InfoState, action) => {
      state.loadingMessageIds = InfoUtils.prepareFinishedLoadingIds(state.loadingMessageIds, action.meta.arg);
    });

    /*
    fetchCommentIds
    */
    builder.addCase(InfoThunks.fetchComments.pending, (state: InfoState, action) => {
      state.loadingCommentIds = InfoUtils.preparePendingLoadingIds(state.loadingCommentIds, action.meta.arg);
    });
    builder.addCase(InfoThunks.fetchComments.fulfilled, (state: InfoState, action) => {
      state.comments = InfoUtils.prepareFulfilledContent(state.comments, action.payload);
      state.loadingCommentIds = InfoUtils.prepareFinishedLoadingIds(state.loadingCommentIds, action.meta.arg);
    });
    builder.addCase(InfoThunks.fetchComments.rejected, (state: InfoState, action) => {
      state.loadingCommentIds = InfoUtils.prepareFinishedLoadingIds(state.loadingCommentIds, action.meta.arg);
    });
  },
});

export default infoSlice;
