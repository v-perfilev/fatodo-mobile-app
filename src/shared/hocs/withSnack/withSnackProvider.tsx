import * as React from 'react';
import {ComponentType, PropsWithChildren, useCallback} from 'react';
import {AxiosResponse} from 'axios';
import {connect, ConnectedProps} from 'react-redux';
import {flowRight} from 'lodash';
import {Snack, SnackBuilder, SnackVariant} from '../../../models/Snack';
import {closeReduxSnack, enqueueReduxSnack} from '../../../store/actions/SnackActions';
import {ResponseUtils} from '../../utils/ResponseUtils';
import {TranslationUtils} from '../../utils/TranslationUtils';
import {SnackContext} from '../../contexts/SnackContext';

const mapDispatchToProps = {enqueueReduxSnack, closeReduxSnack};
const connector = connect(null, mapDispatchToProps);

type Props = PropsWithChildren<ConnectedProps<typeof connector>>;

const withSnackProvider = (Component: ComponentType) => (props: Props) => {
  const {enqueueReduxSnack, closeReduxSnack} = props;
  const enqueueSnack = useCallback((snack: Snack): void => enqueueReduxSnack(snack), [enqueueReduxSnack]);

  const closeSnack = useCallback((key: string): void => closeReduxSnack(key), [closeReduxSnack]);

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

export default flowRight([connector, withSnackProvider]);
