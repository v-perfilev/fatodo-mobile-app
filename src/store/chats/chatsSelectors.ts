import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../store';

const getChatsState = (state: RootState) => state.chats;

class ChatsSelectors {
  static totalUnreadMessageCount = createSelector(getChatsState, (state) => state.totalUnreadMessageCount);

  static unreadMessageCountMap = createSelector(getChatsState, (state) => new Map(state.unreadMessageCountMap));

  static chats = createSelector(getChatsState, (state) => state.chats);

  static loading = createSelector(getChatsState, (state) => state.loading);

  static allLoaded = createSelector(getChatsState, (state) => state.allLoaded);
}

export default ChatsSelectors;
