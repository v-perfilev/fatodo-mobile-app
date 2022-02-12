import * as React from 'react';
import {ComponentType, FC, PropsWithChildren, ReactElement, useCallback, useEffect, useState} from 'react';
import {AxiosResponse} from 'axios';
import {connect, ConnectedProps} from 'react-redux';
import {flowRight} from 'lodash';
import {RootState} from '../../store';
import {closeReduxSnack, enqueueReduxSnack, removeReduxSnack} from '../../store/actions/SnackActions';
import Snack, {SnackBuilder} from '../../models/Snack';
import {useToast} from 'native-base';
import {ReduxSnack, ReduxSnackState} from '../../store/rerducers/SnackReducer';
import {ResponseUtils} from '../utils/ResponseUtils';
import {TranslationUtils} from '../utils/TranslationUtils';
import {SnackContext, SnackState} from '../contexts/SnackContext';

const mapStateToProps = (state: RootState): {snackState: ReduxSnackState} => ({snackState: state.snackState});
const mapDispatchToProps = {enqueueReduxSnack, closeReduxSnack, removeReduxSnack};
const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = PropsWithChildren<ConnectedProps<typeof connector>>;

const withSnack =
  (Component: ComponentType): FC<Props> =>
  ({snackState, enqueueReduxSnack, closeReduxSnack, removeReduxSnack, ...props}: Props): ReactElement => {
    const [displayed, setDisplayed] = useState<string[]>([]);
    const {show, close} = useToast();

    const addDisplayed = (key: string): void => setDisplayed((prevState) => [...prevState, key]);
    const removeDisplayed = (key: string): void => setDisplayed((prevState) => prevState.filter((k) => k !== key));
    const getColorFromStatus = (status: number): string => {
      if (status >= 400 && status < 500) {
        return 'warning.500';
      } else if (status >= 500) {
        return 'error.500';
      } else {
        return 'info.500';
      }
    };

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
            ? new SnackBuilder(message).setColor(getColorFromStatus(status)).build()
            : null;
        if (snack) {
          enqueueSnack(snack);
        }
      },
      [enqueueSnack],
    );

    const handleCode = useCallback(
      (code: string, color: string): void => {
        const message = TranslationUtils.getSnackTranslation(code);
        const snack = message ? new SnackBuilder(message).setColor(color).build() : null;
        if (snack) {
          enqueueSnack(snack);
        }
      },
      [enqueueSnack],
    );

    useEffect(() => {
      snackState.list.forEach(({message, color, key, dismissed = false}: ReduxSnack) => {
        if (dismissed) {
          close(key);
        } else if (!displayed.includes(key)) {
          show({title: message, bgColor: color, id: key, onCloseComplete: () => removeReduxSnack(key)});
          addDisplayed(key);
        }
      });
      const keyList = snackState.list.map((reduxSnack: ReduxSnack) => reduxSnack.key);
      displayed.filter((key) => !keyList.includes(key)).forEach(removeDisplayed);
    });

    const context = {handleResponse, handleCode, enqueueSnack, closeSnack};

    return (
      <SnackContext.Provider value={context}>
        <Component {...props} />
      </SnackContext.Provider>
    );
  };

export const withSnackContext =
  (Component: ComponentType<SnackState>): FC =>
  (props): ReactElement => {
    return (
      <SnackContext.Consumer>{(value): ReactElement => <Component {...props} {...value} />}</SnackContext.Consumer>
    );
  };

export default flowRight([connector, withSnack]);
