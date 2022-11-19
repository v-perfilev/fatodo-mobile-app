import React, {ComponentType, memo, useEffect, useLayoutEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import AuthSelectors from '../../../store/auth/authSelectors';
import {ContactsActions} from '../../../store/contacts/contactsActions';
import {ChatsActions} from '../../../store/chats/chatsActions';
import {EventsActions} from '../../../store/events/eventsActions';
import NotificationsRemote from '../../push/notificationsRemote';
import {AuthActions} from '../../../store/auth/authActions';
import {SecurityUtils} from '../../utils/SecurityUtils';
import {AppState, NativeEventSubscription} from 'react-native';
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
  const [ready, setReady] = useState(false);

  const login = (): void => {
    const tryToLogin = async (token: string): Promise<void> => {
      token && (await dispatch(AuthActions.setIsAuthenticated()));
      token && (await dispatch(AuthActions.fetchAccountThunk()));
    };
    SecurityUtils.getAuthToken().then((token) => tryToLogin(token).finally(() => setReady(true)));
  };

  const getAppStatusSubscription = (): NativeEventSubscription => {
    return AppState.addEventListener('change', (state) => {
      console.log('change', state);
      const isActive = state === 'active';
      const isInactive = state === 'inactive' || state === 'background';
      isActive && dispatch(AuthActions.setIsActive(true));
      isInactive && dispatch(AuthActions.setIsActive(false));
    });
  };

  const refresh = (): void => {
    setTimeout(() => {
      dispatch(ContactsActions.fetchRelationsThunk());
      dispatch(ContactsActions.fetchInfoThunk());
      dispatch(ChatsActions.fetchUnreadMessagesMapThunk());
      dispatch(EventsActions.fetchUnreadCountThunk());
    }, 1000);
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
    reset();
    isActive && isAuthenticated && refresh();
  }, [isActive, isAuthenticated]);

  useEffect(() => {
    account && NotificationsRemote.subscribeToFirebase(account.id);
  }, [account]);

  useLayoutEffect(() => {
    ready && setTimeout(() => SplashScreen.hide(), 500);
  }, [ready]);

  return <Component ready={ready} {...props} />;
};

export default flowRight([memo, withRootContainer]);
