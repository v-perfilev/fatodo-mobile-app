import './shared/i18n';
import './shared/axios';

import React, {FC} from 'react';
import {flowRight} from 'lodash';
import {ReduxAuthState} from './store/rerducers/AuthReducer';
import {bindActionCreators} from 'redux';
import {enqueueReduxSnack} from './store/actions/SnackActions';
import setupAxiosInterceptors from './shared/axios';
import {clearAuth} from './store/actions/AuthActions';
import store from './store/store';
import withStore from './shared/hocs/withStore';
import AuthNavigator from './navigators/AuthNavigator';
import RootNavigator from './navigators/RootNavigator';
import withNativeBase from './shared/hocs/withNativeBase';
import withNavigationContainer from './shared/hocs/withNavigationContainer';
import withSnackbar from './shared/hocs/withSnackbar';
import withAuthState from './shared/hocs/withAuthState';
import {StatusBar, useTheme} from 'native-base';

// setup axios
const axiosActions = bindActionCreators({clearAuth, enqueueReduxSnack}, store.dispatch);
setupAxiosInterceptors({
  onUnauthenticated: axiosActions.clearAuth,
  enqueueReduxSnackbar: axiosActions.enqueueReduxSnack,
});

type AppProps = ReduxAuthState;

const App: FC<AppProps> = ({isAuthenticated}) => {
  const theme = useTheme();
  const backgroundColor = theme.colors.white;

  return (
    <>
      <StatusBar backgroundColor={backgroundColor} barStyle="dark-content" />
      {isAuthenticated ? <RootNavigator /> : <AuthNavigator />}
    </>
  );
};

export default flowRight([withStore, withNativeBase, withNavigationContainer, withSnackbar, withAuthState])(App);
