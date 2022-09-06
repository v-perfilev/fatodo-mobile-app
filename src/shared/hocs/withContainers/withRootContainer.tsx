import React, {ComponentType, memo, useEffect, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import AuthSelectors from '../../../store/auth/authSelectors';
import {ContactsActions} from '../../../store/contacts/contactsActions';
import {ChatsActions} from '../../../store/chats/chatsActions';
import {EventsActions} from '../../../store/events/eventsActions';
import NotificationsRemote from '../../push/notificationsRemote';
import {AuthActions} from '../../../store/auth/authActions';
import {SecurityUtils} from '../../utils/SecurityUtils';
import {AppState, NativeEventSubscription} from 'react-native';
import {SLEEP_MODE_TIMEOUT} from '../../../constants';
import {RootActions} from '../../../store/rootActions';
import SplashScreen from 'react-native-splash-screen';
import {flowRight} from 'lodash';

export type WithRootProps = {
  ready: boolean;
};

const withRootContainer = (Component: ComponentType<WithRootProps>) => (props: any) => {
  const dispatch = useAppDispatch();
  const account = useAppSelector(AuthSelectors.account);
  const isAuthenticated = useAppSelector(AuthSelectors.isAuthenticated);
  const isActive = useAppSelector(AuthSelectors.isActive);
  const isSleepMode = useAppSelector(AuthSelectors.isSleepMode);
  const [ready, setReady] = useState(false);
  const sleepModeTimer = useRef<NodeJS.Timeout>();

  const login = (): void => {
    const tryToLogin = async (token: string): Promise<void> => {
      token && (await dispatch(AuthActions.login()));
      token && (await dispatch(AuthActions.fetchAccountThunk()));
    };
    SecurityUtils.getAuthToken().then((token) => tryToLogin(token).finally(() => setReady(true)));
  };

  const getAppStatusSubscription = (): NativeEventSubscription => {
    return AppState.addEventListener('change', (state) => {
      const isActive = state === 'active';
      dispatch(AuthActions.setIsActive(isActive));
    });
  };

  const handleAppStatus = (): void => {
    if (!isActive) {
      sleepModeTimer.current = setTimeout(() => dispatch(AuthActions.setIsSleepMode(true)), SLEEP_MODE_TIMEOUT);
    } else {
      sleepModeTimer.current && clearTimeout(sleepModeTimer.current);
      sleepModeTimer.current = undefined;
      dispatch(AuthActions.setIsSleepMode(false));
    }
  };

  const refresh = (): void => {
    dispatch(ContactsActions.fetchInfoThunk());
    dispatch(ChatsActions.fetchUnreadMessagesMapThunk());
    dispatch(EventsActions.fetchUnreadCountThunk());
    account?.id && NotificationsRemote.subscribeToFirebase(account.id);
  };

  const reset = (): void => {
    dispatch(RootActions.resetState());
  };

  useEffect(() => {
    login();
  }, []);

  useEffect(() => {
    const appStateSubscription = getAppStatusSubscription();
    return () => appStateSubscription.remove();
  }, []);

  useEffect(() => {
    handleAppStatus();
  }, [isActive]);

  useEffect(() => {
    !isSleepMode && isAuthenticated && refresh();
    isSleepMode && reset();
  }, [isSleepMode]);

  useEffect(() => {
    isAuthenticated && refresh();
  }, [isAuthenticated]);

  useEffect(() => {
    // splash screen (timeout needed for initial navigation event)
    ready && SplashScreen.hide();
  }, [ready]);

  return <Component ready={ready} {...props} />;
};

export default flowRight([memo, withRootContainer]);
