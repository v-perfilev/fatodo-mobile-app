import {Snack, SnackBuilder, SnackVariant} from '../../models/Snack';
import snackSlice from './snackSlice';
import {AxiosResponse} from 'axios';
import {ResponseUtils} from '../../shared/utils/ResponseUtils';
import {TranslationUtils} from '../../shared/utils/TranslationUtils';
import {AppDispatch} from '../store';

class SnackActions {
  static enqueueSnack = (snack: Snack) => (dispatch: AppDispatch) => {
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
    (dispatch: AppDispatch) => {
      dispatch(snackSlice.actions.closeSnack(key));
    };

  static removeSnack = (key: string) => (dispatch: AppDispatch) => {
    dispatch(snackSlice.actions.removeSnack(key));
  };

  static handleResponse = (response: AxiosResponse) => (dispatch: AppDispatch) => {
    const feedbackCode = ResponseUtils.getFeedbackCode(response);
    const status = ResponseUtils.getStatus(response);
    const isStatusCorrect = status && status < 500;
    const message = TranslationUtils.getFeedbackTranslation(feedbackCode);
    const snack = isStatusCorrect && message ? new SnackBuilder(message).setStatusColor(status).build() : null;
    if (snack) {
      dispatch(SnackActions.enqueueSnack(snack));
    }
  };

  static handleCode = (code: string, variant: SnackVariant) => (dispatch: AppDispatch) => {
    const message = TranslationUtils.getSnackTranslation(code);
    const snack = message ? new SnackBuilder(message).setVariantColor(variant).build() : null;
    if (snack) {
      dispatch(SnackActions.enqueueSnack(snack));
    }
  };
}

export default SnackActions;
