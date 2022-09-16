import {Snack, SnackBuilder, SnackVariant} from '../../models/Snack';
import snackSlice from './snackSlice';
import {AppDispatch} from '../store';
import {TranslationUtils} from '../../shared/utils/TranslationUtils';

export class SnackActions {
  static handleCode = (code: string, variant: SnackVariant) => (dispatch: AppDispatch) => {
    const message = TranslationUtils.getSnackTranslation(code);
    const snack = message ? new SnackBuilder(message).setVariantColor(variant).build() : undefined;
    snack && dispatch(snackSlice.actions.enqueueSnack(snack));
  };

  static handleResponse = (status: number, feedbackCode: string) => (dispatch: AppDispatch) => {
    const isStatusCorrect = status && status < 500;
    const message = TranslationUtils.getFeedbackTranslation(feedbackCode);
    let snack = isStatusCorrect && message ? new SnackBuilder(message).setStatusColor(status).build() : undefined;
    snack && dispatch(snackSlice.actions.enqueueSnack(snack));
  };

  static enqueueSnack = (snack: Snack) => (dispatch: AppDispatch) => {
    dispatch(snackSlice.actions.enqueueSnack(snack));
  };

  static removeSnack = (key: string) => (dispatch: AppDispatch) => {
    dispatch(snackSlice.actions.removeSnack(key));
  };

  static closeSnack =
    (key: string = 'all') =>
    (dispatch: AppDispatch) => {
      dispatch(snackSlice.actions.closeSnack(key));
    };
}
