import {AppDispatch} from '../store';
import chatsSlice from './chatsSlice';

export class ChatsActions {
  static test = () => async (dispatch: AppDispatch) => {
    dispatch(chatsSlice.actions.test());
  };
}

export default ChatsActions;
