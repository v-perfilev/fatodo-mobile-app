import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {Chat} from '../../models/Chat';
import {StoreUtils} from '../../shared/utils/StoreUtils';

const getChatsState = (state: RootState) => state.chats;

class ChatsSelectors {
  static chats = createSelector(getChatsState, (state) => state.chats as Chat[]);

  static filteredChats = createSelector(getChatsState, (state) => state.filteredChats as Chat[]);

  static unreadCount = createSelector(getChatsState, (state) => state.unreadCount as number);

  static unreadMessageIds = createSelector(
    [getChatsState, (state, key: string) => key],
    (state, key) => StoreUtils.getValue(state.unreadMap, key, []) as string[],
  );

  static loading = createSelector(getChatsState, (state) => state.loading as boolean);

  static allLoaded = createSelector(getChatsState, (state) => state.allLoaded as boolean);
}

export default ChatsSelectors;
