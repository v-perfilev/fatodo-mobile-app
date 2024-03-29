import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {Chat} from '../../models/Chat';
import {StoreUtils} from '../../shared/utils/StoreUtils';

const getChatsState = (state: RootState) => state.chats;
const getChatId = (_: any, chatId: string) => chatId;

class ChatsSelectors {
  static chats = createSelector(getChatsState, (state) => state.chats as Chat[]);

  static filteredChats = createSelector(getChatsState, (state) => state.filteredChats as Chat[]);

  static unreadCount = createSelector(getChatsState, (state) => state.unreadCount as number);

  static allLoaded = createSelector(getChatsState, (state) => state.allLoaded as boolean);

  static makeUnreadMessageIdsSelector = () =>
    createSelector(
      [getChatsState, getChatId],
      (state, chatId) => StoreUtils.getValue(state.unreadMap, chatId, []) as string[],
    );

  static chatsInitialized = createSelector(getChatsState, (state) => state.chatsInitialized as boolean);

  static shouldLoad = createSelector(getChatsState, (state) => state.shouldLoad as boolean);
}

export default ChatsSelectors;
