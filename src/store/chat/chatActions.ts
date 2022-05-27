import {AppDispatch} from '../store';
import chatSlice from './chatSlice';
import {Chat} from '../../models/Chat';

export class ChatActions {
  static selectChat = (chat: Chat) => async (dispatch: AppDispatch) => {
    dispatch(chatSlice.actions.selectChat(chat));
  };
}

export default ChatActions;
