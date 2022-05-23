import {AppDispatch} from '../store';
import chatSlice from './chatSlice';

export class ChatActions {
  static test = () => async (dispatch: AppDispatch) => {
    dispatch(chatSlice.actions.test());
  };
}

export default ChatActions;
