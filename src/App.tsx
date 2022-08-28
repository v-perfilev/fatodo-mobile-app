import './shared/i18n';
import './shared/axios';
import 'text-encoding';

import React, {useEffect} from 'react';
import {LogBox} from 'react-native';
import {flowRight} from 'lodash';
import {bindActionCreators} from 'redux';
import {setupAxiosInterceptors} from './shared/axios';
import withStore from './shared/hocs/withStore';
import withNativeBase from './shared/hocs/withNativeBase';
import withNavigationContainer from './shared/hocs/withNavigationContainer';
import withGestureHandler from './shared/hocs/withGestureHandler';
import withDialogs from './shared/hocs/withDialogs/withDialogs';
import withSnackDisplay from './shared/hocs/withSnackDisplay';
import {store, useAppSelector} from './store/store';
import AuthSelectors from './store/auth/authSelectors';
import RootNavigator from './navigators/RootNavigator';
import AuthNavigator from './navigators/AuthNavigator';
import {SnackActions} from './store/snack/snackActions';
import {AuthActions} from './store/auth/authActions';
import withWsClient from './shared/hocs/withWs/withWsClient';
import SplashScreen from 'react-native-splash-screen';
import Notifications from './shared/push/notifications';
import NotificationsRemote from './shared/push/notificationsRemote';
import withRootContainer from './shared/hocs/withContainers/withRootContainer';

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

type AppProps = {
  ready: boolean;
};

const App = ({ready}: AppProps) => {
  const isAuthenticated = useAppSelector(AuthSelectors.isAuthenticated);
  const isSleepMode = useAppSelector(AuthSelectors.isSleepMode);

  useEffect(() => {
    // splash screen (timeout needed for initial navigation event)
    ready && setTimeout(() => SplashScreen.hide(), 500);
  }, [ready]);

  return (
    <>
      {ready && isAuthenticated && !isSleepMode && <RootNavigator />}
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
  withRootContainer,
])(App);
