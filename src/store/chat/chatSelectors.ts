import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {Chat} from '../../models/Chat';
import {ChatItem} from '../../models/Message';

const getChatState = (state: RootState) => state.chat;

class ChatSelectors {
  static chat = createSelector(getChatState, (state) => state.chat as Chat);

  static chatItems = createSelector(getChatState, (state) => state.chatItems as ChatItem[]);

  static allLoaded = createSelector(getChatState, (state) => state.allLoaded as boolean);
}

export default ChatSelectors;
