import {AppDispatch} from '../store';
import {Chat} from '../../models/Chat';
import chatsSlice from './chatsSlice';

export class ChatsActions {
  static addChat = (chat: Chat) => (dispatch: AppDispatch) => {
    dispatch(chatsSlice.actions.addChat(chat));
  };

  static updateChat = (chat: Chat) => (dispatch: AppDispatch) => {
    dispatch(chatsSlice.actions.updateChat(chat));
  };

  static removeChat = (chat: Chat) => (dispatch: AppDispatch) => {
    dispatch(chatsSlice.actions.removeChat(chat));
  };
}

export default ChatsActions;
