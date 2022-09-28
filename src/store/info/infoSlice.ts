import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from '../../models/User';
import {InfoState} from './infoType';
import {InfoActions} from './infoActions';
import {GroupInfo} from '../../models/Group';
import {ItemInfo} from '../../models/Item';
import {ChatInfo} from '../../models/Chat';
import {MessageInfo} from '../../models/Message';
import {buildCommentThreadInfo, CommentInfo, CommentThreadInfo} from '../../models/Comment';
import {StoreUtils} from '../../shared/utils/StoreUtils';

const initialState: InfoState = {
  users: [],
  groups: [],
  items: [],
  chats: [],
  messages: [],
  comments: [],
  commentThreads: [],
};

const infoSlice = createSlice({
  name: 'info',
  initialState,
  reducers: {
    reset: (state: InfoState) => {
      Object.assign(state, initialState);
    },

    handleUsers: (state: InfoState, action: PayloadAction<User[]>) => {
      state.users = prepareInfoContentWithId(state.users, action.payload);
    },

    addUsers: (state: InfoState, action: PayloadAction<User[]>) => {
      state.users = prepareInfoContentWithId(state.users, action.payload);
    },

    addGroups: (state: InfoState, action: PayloadAction<GroupInfo[]>) => {
      state.groups = prepareInfoContentWithId(state.groups, action.payload);
    },

    addItems: (state: InfoState, action: PayloadAction<ItemInfo[]>) => {
      state.items = prepareInfoContentWithId(state.items, action.payload);
    },

    addChats: (state: InfoState, action: PayloadAction<ChatInfo[]>) => {
      state.chats = prepareInfoContentWithId(state.chats, action.payload);
    },

    addMessages: (state: InfoState, action: PayloadAction<MessageInfo[]>) => {
      state.messages = prepareInfoContentWithId(state.messages, action.payload);
    },

    addComments: (state: InfoState, action: PayloadAction<CommentInfo[]>) => {
      state.comments = prepareInfoContentWithId(state.comments, action.payload);
    },

    addCommentThreads: (state: InfoState, action: PayloadAction<CommentThreadInfo[]>) => {
      state.commentThreads = prepareInfoContentWithTargetId(state.commentThreads, action.payload);
    },

    incrementCommentCount: (state: InfoState, action: PayloadAction<string>) => {
      const info = StoreUtils.getValue(state.commentThreads, action.payload, buildCommentThreadInfo(action.payload));
      if (info) {
        info.count = info.count + 1;
        state.commentThreads = StoreUtils.setValue(state.commentThreads, action.payload, info);
      }
    },

    incrementUnreadCommentCount: (state: InfoState, action: PayloadAction<string>) => {
      const info = StoreUtils.getValue(state.commentThreads, action.payload, buildCommentThreadInfo(action.payload));
      if (info) {
        info.unread = info.unread + 1;
        state.commentThreads = StoreUtils.setValue(state.commentThreads, action.payload, info);
      }
    },

    refreshUnreadCommentCount: (state: InfoState, action: PayloadAction<string>) => {
      const info = StoreUtils.getValue(state.commentThreads, action.payload, buildCommentThreadInfo(action.payload));
      if (info) {
        info.unread = 0;
        state.commentThreads = StoreUtils.setValue(state.commentThreads, action.payload, info);
      }
    },
  },
  extraReducers: (builder) => {
    /*
    handleUserIds
    */
    builder.addCase(InfoActions.handleUserIdsThunk.fulfilled, (state, action) => {
      infoSlice.caseReducers.addUsers(state, action);
    });

    /*
    handleGroupIds
    */
    builder.addCase(InfoActions.handleGroupIdsThunk.fulfilled, (state, action) => {
      infoSlice.caseReducers.addGroups(state, action);
    });

    /*
    handleItemIds
    */
    builder.addCase(InfoActions.handleItemIdsThunk.fulfilled, (state, action) => {
      infoSlice.caseReducers.addItems(state, action);
    });

    /*
    handleChatIds
    */
    builder.addCase(InfoActions.handleChatIdsThunk.fulfilled, (state, action) => {
      infoSlice.caseReducers.addChats(state, action);
    });

    /*
    handleMessageIds
    */
    builder.addCase(InfoActions.handleMessageIdsThunk.fulfilled, (state, action) => {
      infoSlice.caseReducers.addMessages(state, action);
    });

    /*
    handleCommentIds
    */
    builder.addCase(InfoActions.handleCommentIdsThunk.fulfilled, (state, action) => {
      infoSlice.caseReducers.addComments(state, action);
    });

    /*
    handleCommentThreadIds
    */
    builder.addCase(InfoActions.handleCommentThreadIdsThunk.fulfilled, (state, action) => {
      infoSlice.caseReducers.addCommentThreads(state, action);
    });

    /*
    refreshCommentThreads
    */
    builder.addCase(InfoActions.refreshCommentThreadsThunk.pending, (state, action) => {
      infoSlice.caseReducers.refreshUnreadCommentCount(state, {...action, payload: action.meta.arg});
    });
  },
});

const prepareInfoContentWithId = <T extends {id: string}>(
  stateValues: [string, T][],
  newValues: T[],
): [string, T][] => {
  const newIds = newValues.map((value) => value.id);
  const updatedValues = stateValues.filter(([key, _]) => !newIds.includes(key));
  newValues.forEach((value) => updatedValues.push([value.id, value]));
  return updatedValues;
};

const prepareInfoContentWithTargetId = <T extends {targetId: string}>(
  stateValues: [string, T][],
  newValues: T[],
): [string, T][] => {
  const newTargetIds = newValues.map((value) => value.targetId);
  const updatedValues = stateValues.filter(([key, _]) => !newTargetIds.includes(key));
  newValues.forEach((value) => updatedValues.push([value.targetId, value]));
  return updatedValues;
};

export default infoSlice;
