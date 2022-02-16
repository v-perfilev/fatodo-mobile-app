import './shared/i18n';
import './shared/axios';

import React, {FC} from 'react';
import {flowRight} from 'lodash';
import {ReduxAuthState} from './store/rerducers/AuthReducer';
import withNavigationContainer from './shared/hocs/withNavigationContainer';
import withStore from './shared/hocs/withStore';
import withAuthState from './shared/hocs/withAuthState';
import withNativeBase from './shared/hocs/withNativeBase';
import withSnackbar from './shared/hocs/withSnackbar';
import {StatusBar, useTheme} from 'native-base';
import RootNavigator from './navigators/RootNavigator';
import AuthNavigator from './navigators/AuthNavigator';
import {bindActionCreators} from 'redux';
import {enqueueReduxSnack} from './store/actions/SnackActions';
import setupAxiosInterceptors from './shared/axios';
import {clearAuth} from './store/actions/AuthActions';
import store from './store/store';

// setup axios
const axiosActions = bindActionCreators({clearAuth, enqueueReduxSnack}, store.dispatch);
setupAxiosInterceptors({
  onUnauthenticated: axiosActions.clearAuth,
  enqueueReduxSnackbar: axiosActions.enqueueReduxSnack,
});

type AppProps = ReduxAuthState;

const App: FC<AppProps> = ({isAuthenticated}) => {
  const theme = useTheme();
  const backgroundColor = theme.colors.gray['100'];

  return (
    <>
      <StatusBar backgroundColor={backgroundColor} barStyle="dark-content" />
      {isAuthenticated ? <RootNavigator /> : <AuthNavigator />}
    </>
  );
};

export default flowRight([withStore, withNativeBase, withNavigationContainer, withSnackbar, withAuthState])(App);
