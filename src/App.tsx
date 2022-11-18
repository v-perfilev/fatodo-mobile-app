import './shared/i18n';
import './shared/axios';
import 'text-encoding';

import React from 'react';
import {LogBox, Platform} from 'react-native';
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
import AuthNavigator from './navigators/AuthNavigator';
import {SnackActions} from './store/snack/snackActions';
import {AuthActions} from './store/auth/authActions';
import withWsClient from './shared/hocs/withWs/withWsClient';
import Notifications from './shared/push/notifications';
import NotificationsRemote from './shared/push/notificationsRemote';
import withRootContainer from './shared/hocs/withContainers/withRootContainer';
import DrawerNavigator from './navigators/DrawerNavigator';
import ColoredStatusBar from './components/layouts/ColoredStatusBar';
import FBox from './components/boxes/FBox';

// ignore some warnings
const ignoredLogPatterns = [
  'Require cycle',
  'Possible Unhandled Promise Rejection',
  'NativeBase:',
  'EventEmitter.removeListener',
];
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

  const safeAreaBottom = Platform.OS === 'ios' ? 5 : true;

  return (
    <FBox safeAreaTop safeAreaBottom={safeAreaBottom}>
      <ColoredStatusBar />
      {ready && isAuthenticated && <DrawerNavigator />}
      {ready && !isAuthenticated && <AuthNavigator />}
    </FBox>
  );
};

export default flowRight([
  withStore,
  withGestureHandler,
  withNativeBase,
  withNavigationContainer,
  withSnackDisplay,
  withWsClient,
  withDialogs,
  withRootContainer,
])(App);
