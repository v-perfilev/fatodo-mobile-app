import './shared/i18n';
import './shared/axios';
import 'text-encoding';
import 'react-native-gesture-handler';
import 'react-native-get-random-values';

import React from 'react';
import {LogBox} from 'react-native';
import {flowRight} from 'lodash';
import {bindActionCreators} from 'redux';
import {setupAxiosInterceptors} from './shared/axios';
import withStore from './shared/hocs/withStore';
import withNavigationContainer from './shared/hocs/withNavigationContainer';
import withGestureHandler from './shared/hocs/withGestureHandler';
import withDialogs from './shared/hocs/withDialogs/withDialogs';
import withSnackDisplay from './shared/hocs/withSnackDisplay';
import {store} from './store/store';
import {SnackActions} from './store/snack/snackActions';
import {AuthActions} from './store/auth/authActions';
import withWsClient from './shared/hocs/withWs/withWsClient';
import Notifications from './shared/push/notifications';
import NotificationsRemote from './shared/push/notificationsRemote';
import withRootContainer from './shared/hocs/withContainers/withRootContainer';
import ColoredStatusBar from './components/layouts/ColoredStatusBar';
import RootNavigator from './navigators/RootNavigator';
import withNotificationDisplay from './shared/hocs/withNotificationDisplay';
import withSound from './shared/hocs/withSound';
import withVersionCheck from './shared/hocs/withStartupModalDisplay';
import withUrlListener from './shared/hocs/withUrlListener';

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
    logout: AuthActions.logoutThunk,
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
  return (
    <>
      <ColoredStatusBar />
      <RootNavigator />
    </>
  );
};

export default flowRight([
  withStore,
  withSound,
  withGestureHandler,
  withNavigationContainer,
  withNotificationDisplay,
  withSnackDisplay,
  withWsClient,
  withDialogs,
  withUrlListener,
  withRootContainer,
  withVersionCheck,
])(App);
