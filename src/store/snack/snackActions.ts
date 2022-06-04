import {Snack} from '../../models/Snack';
import snackSlice from './snackSlice';
import {AxiosResponse} from 'axios';
import {AppDispatch} from '../store';

export class SnackActions {
  static enqueueSnack = (snack: Snack) => (dispatch: AppDispatch) => {
    dispatch(snackSlice.actions.enqueueSnack(snack));
  };

  static closeSnack =
    (key = 'all') =>
    (dispatch: AppDispatch) => {
      dispatch(snackSlice.actions.closeSnack(key));
    };

  static removeSnack = (key: string) => (dispatch: AppDispatch) => {
    dispatch(snackSlice.actions.removeSnack(key));
  };

  static handleResponse = (response: AxiosResponse) => (dispatch: AppDispatch) => {
    dispatch(snackSlice.actions.handleResponse(response));
  };
}
