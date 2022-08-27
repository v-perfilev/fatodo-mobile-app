import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from '../../models/User';
import {InfoState} from './infoType';
import {InfoActions} from './infoActions';
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
    builder.addCase(InfoActions.fetchUsersThunk.pending, (state: InfoState, action) => {
      state.loadingUserIds = InfoUtils.preparePendingLoadingIds(state.loadingUserIds, action.meta.arg);
    });
    builder.addCase(InfoActions.fetchUsersThunk.fulfilled, (state: InfoState, action) => {
      state.users = InfoUtils.prepareFulfilledContent(state.users, action.payload);
      state.loadingUserIds = InfoUtils.prepareFinishedLoadingIds(state.loadingUserIds, action.meta.arg);
    });
    builder.addCase(InfoActions.fetchUsersThunk.rejected, (state: InfoState, action) => {
      state.loadingUserIds = InfoUtils.prepareFinishedLoadingIds(state.loadingUserIds, action.meta.arg);
    });

    /*
    fetchGroupIds
    */
    builder.addCase(InfoActions.fetchGroupsThunk.pending, (state: InfoState, action) => {
      state.loadingGroupIds = InfoUtils.preparePendingLoadingIds(state.loadingGroupIds, action.meta.arg);
    });
    builder.addCase(InfoActions.fetchGroupsThunk.fulfilled, (state: InfoState, action) => {
      state.groups = InfoUtils.prepareFulfilledContent(state.groups, action.payload);
      state.loadingGroupIds = InfoUtils.prepareFinishedLoadingIds(state.loadingGroupIds, action.meta.arg);
    });
    builder.addCase(InfoActions.fetchGroupsThunk.rejected, (state: InfoState, action) => {
      state.loadingGroupIds = InfoUtils.prepareFinishedLoadingIds(state.loadingGroupIds, action.meta.arg);
    });

    /*
    fetchItemIds
    */
    builder.addCase(InfoActions.fetchItemsThunk.pending, (state: InfoState, action) => {
      state.loadingItemIds = InfoUtils.preparePendingLoadingIds(state.loadingItemIds, action.meta.arg);
    });
    builder.addCase(InfoActions.fetchItemsThunk.fulfilled, (state: InfoState, action) => {
      state.items = InfoUtils.prepareFulfilledContent(state.items, action.payload);
      state.loadingItemIds = InfoUtils.prepareFinishedLoadingIds(state.loadingItemIds, action.meta.arg);
    });
    builder.addCase(InfoActions.fetchItemsThunk.rejected, (state: InfoState, action) => {
      state.loadingItemIds = InfoUtils.prepareFinishedLoadingIds(state.loadingItemIds, action.meta.arg);
    });

    /*
    fetchChatIds
    */
    builder.addCase(InfoActions.fetchChatsThunk.pending, (state: InfoState, action) => {
      state.loadingChatIds = InfoUtils.preparePendingLoadingIds(state.loadingChatIds, action.meta.arg);
    });
    builder.addCase(InfoActions.fetchChatsThunk.fulfilled, (state: InfoState, action) => {
      state.chats = InfoUtils.prepareFulfilledContent(state.chats, action.payload);
      state.loadingChatIds = InfoUtils.prepareFinishedLoadingIds(state.loadingChatIds, action.meta.arg);
    });
    builder.addCase(InfoActions.fetchChatsThunk.rejected, (state: InfoState, action) => {
      state.loadingChatIds = InfoUtils.prepareFinishedLoadingIds(state.loadingChatIds, action.meta.arg);
    });

    /*
    fetchMessageIds
    */
    builder.addCase(InfoActions.fetchMessagesThunk.pending, (state: InfoState, action) => {
      state.loadingMessageIds = InfoUtils.preparePendingLoadingIds(state.loadingMessageIds, action.meta.arg);
    });
    builder.addCase(InfoActions.fetchMessagesThunk.fulfilled, (state: InfoState, action) => {
      state.messages = InfoUtils.prepareFulfilledContent(state.messages, action.payload);
      state.loadingMessageIds = InfoUtils.prepareFinishedLoadingIds(state.loadingMessageIds, action.meta.arg);
    });
    builder.addCase(InfoActions.fetchMessagesThunk.rejected, (state: InfoState, action) => {
      state.loadingMessageIds = InfoUtils.prepareFinishedLoadingIds(state.loadingMessageIds, action.meta.arg);
    });

    /*
    fetchCommentIds
    */
    builder.addCase(InfoActions.fetchCommentsThunk.pending, (state: InfoState, action) => {
      state.loadingCommentIds = InfoUtils.preparePendingLoadingIds(state.loadingCommentIds, action.meta.arg);
    });
    builder.addCase(InfoActions.fetchCommentsThunk.fulfilled, (state: InfoState, action) => {
      state.comments = InfoUtils.prepareFulfilledContent(state.comments, action.payload);
      state.loadingCommentIds = InfoUtils.prepareFinishedLoadingIds(state.loadingCommentIds, action.meta.arg);
    });
    builder.addCase(InfoActions.fetchCommentsThunk.rejected, (state: InfoState, action) => {
      state.loadingCommentIds = InfoUtils.prepareFinishedLoadingIds(state.loadingCommentIds, action.meta.arg);
    });
  },
});

export default infoSlice;
