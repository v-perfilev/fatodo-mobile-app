import {AppDispatch} from '../store';
import commonSlice from './commonSlice';

export class CommonActions {
  static setFreeze = (freeze: boolean) => async (dispatch: AppDispatch) => {
    dispatch(commonSlice.actions.setFreeze(freeze));
  };
}
