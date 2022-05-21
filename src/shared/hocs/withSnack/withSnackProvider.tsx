import * as React from 'react';
import {ComponentType, useCallback} from 'react';
import {AxiosResponse} from 'axios';
import {Snack, SnackBuilder, SnackVariant} from '../../../models/Snack';
import {ResponseUtils} from '../../utils/ResponseUtils';
import {TranslationUtils} from '../../utils/TranslationUtils';
import {SnackContext} from '../../contexts/SnackContext';
import {useAppDispatch} from '../../../store/hooks';
import SnackActions from '../../../store/snack/snackActions';

const withSnackProvider = (Component: ComponentType) => (props: any) => {
  const dispatch = useAppDispatch();

  const enqueueSnack = useCallback((snack: Snack): void => dispatch(SnackActions.enqueueSnack(snack)), [dispatch]);

  const closeSnack = useCallback((key: string): void => dispatch(SnackActions.closeSnack(key)), [dispatch]);

  const handleResponse = useCallback(
    (response: AxiosResponse, allowedCodes: string[] | '*' = '*', excludedCodes: string[] | '' = ''): void => {
      const feedbackCode = ResponseUtils.getFeedbackCode(response);
      const status = ResponseUtils.getStatus(response);
      const isFeedBackCorrect =
        feedbackCode &&
        (allowedCodes === '*' || allowedCodes.includes(feedbackCode)) &&
        (excludedCodes === '' || !excludedCodes.includes(feedbackCode));
      const isStatusCorrect = status && status < 500;
      const message = TranslationUtils.getFeedbackTranslation(feedbackCode);
      const snack =
        isFeedBackCorrect && isStatusCorrect && message
          ? new SnackBuilder(message).setStatusColor(status).build()
          : null;
      if (snack) {
        enqueueSnack(snack);
      }
    },
    [enqueueSnack],
  );

  const handleCode = useCallback(
    (code: string, variant: SnackVariant): void => {
      const message = TranslationUtils.getSnackTranslation(code);
      const snack = message ? new SnackBuilder(message).setVariantColor(variant).build() : null;
      if (snack) {
        enqueueSnack(snack);
      }
    },
    [enqueueSnack],
  );

  const context = {handleResponse, handleCode, enqueueSnack, closeSnack};

  return (
    <SnackContext.Provider value={context}>
      <Component {...props} />
    </SnackContext.Provider>
  );
};

export default withSnackProvider;
