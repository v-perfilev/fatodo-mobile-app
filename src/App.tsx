import './shared/i18n';
import './shared/axios';
import 'text-encoding';

import React, {useEffect, useState} from 'react';
import {LogBox} from 'react-native';
import {flowRight} from 'lodash';
import {bindActionCreators} from 'redux';
import {setupAxiosInterceptors} from './shared/axios';
import withStore from './shared/hocs/withStore';
import withNativeBase from './shared/hocs/withNativeBase';
import withNavigationContainer from './shared/hocs/withNavigationContainer';
import withGestureHandler from './shared/hocs/withGestureHandler';
import {SecurityUtils} from './shared/utils/SecurityUtils';
import withDialogs from './shared/hocs/withDialogs/withDialogs';
import withSnackDisplay from './shared/hocs/withSnackDisplay';
import {store, useAppDispatch, useAppSelector} from './store/store';
import AuthSelectors from './store/auth/authSelectors';
import RootNavigator from './navigators/RootNavigator';
import AuthNavigator from './navigators/AuthNavigator';
import {SnackActions} from './store/snack/snackActions';
import {ContactsThunks} from './store/contacts/contactsActions';
import {AuthActions, AuthThunks} from './store/auth/authActions';
import withWsClient from './shared/hocs/withWs/withWsClient';
import {ChatsThunks} from './store/chats/chatsActions';
import SplashScreen from 'react-native-splash-screen';
import Notifications from './shared/push/notifications';
import NotificationsRemote from './shared/push/notificationsRemote';

// ignore some warnings
const ignoredLogPatterns = ['Require cycle', 'Possible Unhandled Promise Rejection', 'NativeBase:'];
LogBox.ignoreLogs(ignoredLogPatterns);

// setup push notification
Notifications.init();
NotificationsRemote.init();

// setup axios
const axiosActions = bindActionCreators(
  {
    logout: AuthActions.logout,
    enqueueSnack: SnackActions.enqueueSnack,
    handleResponse: SnackActions.handleResponse,
  },
  store.dispatch,
);
setupAxiosInterceptors({
  onUnauthenticated: axiosActions.logout,
  enqueueSnack: axiosActions.enqueueSnack,
  handleResponse: axiosActions.handleResponse,
});

const App = () => {
  const dispatch = useAppDispatch();
  const account = useAppSelector(AuthSelectors.account);
  const isAuthenticated = useAppSelector(AuthSelectors.isAuthenticated);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // login
    SecurityUtils.getAuthToken().then(async (token) => {
      if (token) {
        await dispatch(AuthActions.login());
        await dispatch(AuthThunks.fetchAccount());
      }
      setReady(true);
    });
  }, []);

  useEffect(() => {
    // splash screen (timeout needed for initial navigation event)
    ready && setTimeout(() => SplashScreen.hide(), 500);
  }, [ready]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(ContactsThunks.fetchInfo());
      dispatch(ChatsThunks.fetchUnreadMessagesMap());
      account?.id && NotificationsRemote.subscribeToFirebase(account.id);
    }
  }, [isAuthenticated]);

  return (
    <>
      {ready && isAuthenticated && <RootNavigator />}
      {ready && !isAuthenticated && <AuthNavigator />}
    </>
  );
};

export default flowRight([
  withStore,
  withSnackDisplay,
  withGestureHandler,
  withNativeBase,
  withNavigationContainer,
  withWsClient,
  withDialogs,
])(App);
