import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../store';

const getChatState = (state: RootState) => state.chat;

class ChatSelectors {
  static chat = createSelector(getChatState, (state) => state.chat);

  static chatItems = createSelector(getChatState, (state) => state.chatItems);

  static loading = createSelector(getChatState, (state) => state.loading);

  static allLoaded = createSelector(getChatState, (state) => state.allLoaded);
}

export default ChatSelectors;
