import {Dispatch} from 'redux';
import {Snack} from '../../models/Snack';

export const ACTION_TYPES = {
  ENQUEUE_SNACKBAR: 'snackState/ENQUEUE_SNACKBAR',
  CLOSE_SNACKBAR: 'snackState/CLOSE_SNACKBAR',
  REMOVE_SNACKBAR: 'snackState/REMOVE_SNACKBAR',
};

export const enqueueReduxSnack =
  (snack: Snack) =>
  (dispatch: Dispatch): void => {
    dispatch({
      type: ACTION_TYPES.ENQUEUE_SNACKBAR,
      snack: {
        ...snack,
        key: new Date().getTime() + Math.random(),
      },
    });
  };

export const closeReduxSnack =
  (key: string = 'all') =>
  (dispatch: Dispatch): void => {
    dispatch({
      type: ACTION_TYPES.CLOSE_SNACKBAR,
      key,
    });
  };

export const removeReduxSnack =
  (key: string) =>
  (dispatch: Dispatch): void => {
    dispatch({
      type: ACTION_TYPES.REMOVE_SNACKBAR,
      key,
    });
  };
