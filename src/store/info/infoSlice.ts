import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from '../../models/User';
import {InfoState} from './infoType';
import {InfoActions} from './infoActions';
import {GroupInfo} from '../../models/Group';
import {ItemInfo} from '../../models/Item';
import {ChatInfo} from '../../models/Chat';
import {MessageInfo} from '../../models/Message';
import {CommentInfo, CommentThreadInfo} from '../../models/Comment';
import {StoreUtils} from '../../shared/utils/StoreUtils';

const initialState: InfoState = {
  users: [],
  groups: [],
  items: [],
  chats: [],
  messages: [],
  comments: [],
  commentThreads: [],
  loadingUserIds: [],
  loadingGroupIds: [],
  loadingItemIds: [],
  loadingChatIds: [],
  loadingMessageIds: [],
  loadingCommentsIds: [],
  loadingCommentThreadIds: [],
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

    addLoadingUserIds: (state: InfoState, action: PayloadAction<string[]>) => {
      state.loadingUserIds = [...state.loadingUserIds, ...action.payload];
    },

    removeLoadingUserIds: (state: InfoState, action: PayloadAction<string[]>) => {
      state.loadingUserIds = state.loadingUserIds.filter((id) => !action.payload.includes(id));
    },

    addGroups: (state: InfoState, action: PayloadAction<GroupInfo[]>) => {
      state.groups = prepareInfoContentWithId(state.groups, action.payload);
    },

    addLoadingGroupIds: (state: InfoState, action: PayloadAction<string[]>) => {
      state.loadingGroupIds = [...state.loadingGroupIds, ...action.payload];
    },

    removeLoadingGroupIds: (state: InfoState, action: PayloadAction<string[]>) => {
      state.loadingGroupIds = state.loadingGroupIds.filter((id) => !action.payload.includes(id));
    },

    addItems: (state: InfoState, action: PayloadAction<ItemInfo[]>) => {
      state.items = prepareInfoContentWithId(state.items, action.payload);
    },

    addLoadingItemIds: (state: InfoState, action: PayloadAction<string[]>) => {
      state.loadingItemIds = [...state.loadingItemIds, ...action.payload];
    },

    removeLoadingItemIds: (state: InfoState, action: PayloadAction<string[]>) => {
      state.loadingItemIds = state.loadingItemIds.filter((id) => !action.payload.includes(id));
    },

    addChats: (state: InfoState, action: PayloadAction<ChatInfo[]>) => {
      state.chats = prepareInfoContentWithId(state.chats, action.payload);
    },

    addLoadingChatIds: (state: InfoState, action: PayloadAction<string[]>) => {
      state.loadingChatIds = [...state.loadingChatIds, ...action.payload];
    },

    removeLoadingChatIds: (state: InfoState, action: PayloadAction<string[]>) => {
      state.loadingChatIds = state.loadingChatIds.filter((id) => !action.payload.includes(id));
    },

    addMessages: (state: InfoState, action: PayloadAction<MessageInfo[]>) => {
      state.messages = prepareInfoContentWithId(state.messages, action.payload);
    },

    addLoadingMessageIds: (state: InfoState, action: PayloadAction<string[]>) => {
      state.loadingMessageIds = [...state.loadingMessageIds, ...action.payload];
    },

    removeLoadingMessageIds: (state: InfoState, action: PayloadAction<string[]>) => {
      state.loadingMessageIds = state.loadingMessageIds.filter((id) => !action.payload.includes(id));
    },

    addComments: (state: InfoState, action: PayloadAction<CommentInfo[]>) => {
      state.comments = prepareInfoContentWithId(state.comments, action.payload);
    },

    addLoadingCommentIds: (state: InfoState, action: PayloadAction<string[]>) => {
      state.loadingCommentsIds = [...state.loadingCommentsIds, ...action.payload];
    },

    removeLoadingCommentIds: (state: InfoState, action: PayloadAction<string[]>) => {
      state.loadingCommentsIds = state.loadingCommentsIds.filter((id) => !action.payload.includes(id));
    },

    addCommentThreads: (state: InfoState, action: PayloadAction<CommentThreadInfo[]>) => {
      state.commentThreads = prepareInfoContentWithTargetId(state.commentThreads, action.payload);
    },

    addLoadingCommentThreadIds: (state: InfoState, action: PayloadAction<string[]>) => {
      state.loadingCommentThreadIds = [...state.loadingCommentThreadIds, ...action.payload];
    },

    removeLoadingCommentThreadIds: (state: InfoState, action: PayloadAction<string[]>) => {
      state.loadingCommentThreadIds = state.loadingCommentThreadIds.filter((id) => !action.payload.includes(id));
    },

    incrementCommentCount: (state: InfoState, action: PayloadAction<string>) => {
      const info = StoreUtils.getValue(state.commentThreads, action.payload, undefined);
      if (info) {
        info.count = info.count + 1;
        state.commentThreads = StoreUtils.setValue(state.commentThreads, action.payload, info);
      }
    },

    incrementUnreadCommentCount: (state: InfoState, action: PayloadAction<string>) => {
      const info = StoreUtils.getValue(state.commentThreads, action.payload, undefined);
      if (info) {
        info.unread = info.unread + 1;
        state.commentThreads = StoreUtils.setValue(state.commentThreads, action.payload, info);
      }
    },

    refreshUnreadCommentCount: (state: InfoState, action: PayloadAction<string>) => {
      const info = StoreUtils.getValue(state.commentThreads, action.payload, undefined);
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
    builder.addCase(InfoActions.handleUserIdsThunk.pending, (state, action) => {
      infoSlice.caseReducers.addLoadingUserIds(state, {...action, payload: action.meta.arg});
    });
    builder.addCase(InfoActions.handleUserIdsThunk.fulfilled, (state, action) => {
      infoSlice.caseReducers.addUsers(state, action);
      infoSlice.caseReducers.removeLoadingUserIds(state, {...action, payload: action.meta.arg});
    });
    builder.addCase(InfoActions.handleUserIdsThunk.rejected, (state, action) => {
      infoSlice.caseReducers.removeLoadingUserIds(state, {...action, payload: action.meta.arg});
    });

    /*
    handleGroupIds
    */
    builder.addCase(InfoActions.handleGroupIdsThunk.pending, (state, action) => {
      infoSlice.caseReducers.addLoadingGroupIds(state, {...action, payload: action.meta.arg});
    });
    builder.addCase(InfoActions.handleGroupIdsThunk.fulfilled, (state, action) => {
      infoSlice.caseReducers.addGroups(state, action);
      infoSlice.caseReducers.removeLoadingGroupIds(state, {...action, payload: action.meta.arg});
    });
    builder.addCase(InfoActions.handleGroupIdsThunk.rejected, (state, action) => {
      infoSlice.caseReducers.removeLoadingGroupIds(state, {...action, payload: action.meta.arg});
    });

    /*
    handleItemIds
    */
    builder.addCase(InfoActions.handleItemIdsThunk.pending, (state, action) => {
      infoSlice.caseReducers.addLoadingItemIds(state, {...action, payload: action.meta.arg});
    });
    builder.addCase(InfoActions.handleItemIdsThunk.fulfilled, (state, action) => {
      infoSlice.caseReducers.addItems(state, action);
      infoSlice.caseReducers.removeLoadingItemIds(state, {...action, payload: action.meta.arg});
    });
    builder.addCase(InfoActions.handleItemIdsThunk.rejected, (state, action) => {
      infoSlice.caseReducers.removeLoadingItemIds(state, {...action, payload: action.meta.arg});
    });

    /*
    handleChatIds
    */
    builder.addCase(InfoActions.handleChatIdsThunk.pending, (state, action) => {
      infoSlice.caseReducers.addLoadingChatIds(state, {...action, payload: action.meta.arg});
    });
    builder.addCase(InfoActions.handleChatIdsThunk.fulfilled, (state, action) => {
      infoSlice.caseReducers.addChats(state, action);
      infoSlice.caseReducers.removeLoadingChatIds(state, {...action, payload: action.meta.arg});
    });
    builder.addCase(InfoActions.handleChatIdsThunk.rejected, (state, action) => {
      infoSlice.caseReducers.removeLoadingChatIds(state, {...action, payload: action.meta.arg});
    });

    /*
    handleMessageIds
    */
    builder.addCase(InfoActions.handleMessageIdsThunk.pending, (state, action) => {
      infoSlice.caseReducers.addLoadingMessageIds(state, {...action, payload: action.meta.arg});
    });
    builder.addCase(InfoActions.handleMessageIdsThunk.fulfilled, (state, action) => {
      infoSlice.caseReducers.addMessages(state, action);
      infoSlice.caseReducers.removeLoadingMessageIds(state, {...action, payload: action.meta.arg});
    });
    builder.addCase(InfoActions.handleMessageIdsThunk.rejected, (state, action) => {
      infoSlice.caseReducers.removeLoadingMessageIds(state, {...action, payload: action.meta.arg});
    });

    /*
    handleCommentIds
    */
    builder.addCase(InfoActions.handleCommentIdsThunk.pending, (state, action) => {
      infoSlice.caseReducers.addLoadingCommentIds(state, {...action, payload: action.meta.arg});
    });
    builder.addCase(InfoActions.handleCommentIdsThunk.fulfilled, (state, action) => {
      infoSlice.caseReducers.addComments(state, action);
      infoSlice.caseReducers.removeLoadingCommentIds(state, {...action, payload: action.meta.arg});
    });
    builder.addCase(InfoActions.handleCommentIdsThunk.rejected, (state, action) => {
      infoSlice.caseReducers.removeLoadingCommentIds(state, {...action, payload: action.meta.arg});
    });

    /*
    handleCommentThreadIds
    */
    builder.addCase(InfoActions.handleCommentThreadIdsThunk.pending, (state, action) => {
      infoSlice.caseReducers.addLoadingCommentThreadIds(state, {...action, payload: action.meta.arg});
    });
    builder.addCase(InfoActions.handleCommentThreadIdsThunk.fulfilled, (state, action) => {
      infoSlice.caseReducers.addCommentThreads(state, action);
      infoSlice.caseReducers.removeLoadingCommentThreadIds(state, {...action, payload: action.meta.arg});
    });
    builder.addCase(InfoActions.handleCommentThreadIdsThunk.rejected, (state, action) => {
      infoSlice.caseReducers.removeLoadingCommentThreadIds(state, {...action, payload: action.meta.arg});
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
