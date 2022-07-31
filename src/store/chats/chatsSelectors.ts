import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../store';

const getChatsState = (state: RootState) => state.chats;

class ChatsSelectors {
  static chats = createSelector(getChatsState, (state) => state.chats);

  static filteredChats = createSelector(getChatsState, (state) => state.filteredChats);

  static unreadCount = createSelector(getChatsState, (state) => state.unreadCount);

  static unreadMap = createSelector(getChatsState, (state) => new Map(state.unreadMap));

  static loading = createSelector(getChatsState, (state) => state.loading);

  static allLoaded = createSelector(getChatsState, (state) => state.allLoaded);
}

export default ChatsSelectors;
