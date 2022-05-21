import {Dispatch} from 'redux';
import {Snack} from '../../models/Snack';
import snackSlice from './snackSlice';

export class SnackActions {
  static enqueueSnack = (snack: Snack) => (dispatch: Dispatch) => {
    dispatch(
      snackSlice.actions.enqueueSnack({
        ...snack,
        dismissed: false,
        key: `${new Date().getTime()}${Math.random()}`,
      }),
    );
  };

  static closeSnack =
    (key = 'all') =>
    (dispatch: Dispatch) => {
      dispatch(snackSlice.actions.closeSnack(key));
    };

  static removeSnack = (key: string) => (dispatch: Dispatch) => {
    dispatch(snackSlice.actions.removeSnack(key));
  };
}

export default SnackActions;
