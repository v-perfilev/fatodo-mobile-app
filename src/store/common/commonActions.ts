import {AppDispatch} from '../store';
import commonSlice from './commonSlice';

export class CommonActions {
  static setFreezeTabs = (freeze: boolean) => async (dispatch: AppDispatch) => {
    dispatch(commonSlice.actions.setFreezeTabs(freeze));
  };

  static setFreezeCalendar = (freeze: boolean) => async (dispatch: AppDispatch) => {
    dispatch(commonSlice.actions.setFreezeCalendar(freeze));
  };
}
