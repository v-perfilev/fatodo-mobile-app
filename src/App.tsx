import React, {FC} from 'react';
import {flowRight} from 'lodash';
import withNavigationContainer from './shared/hocs/withNavigationContainer';
import withStore from './shared/hocs/withStore';

import './shared/i18n';
import './shared/axios';
import withAuthState from './shared/hocs/withAuthState';
import {ReduxAuthState} from './store/rerducers/AuthReducer';
import RootNavigator from './navigators/RootNavigator';
import AuthNavigator from './navigators/AuthNavigator';
import withNativeBase from './shared/hocs/withNativeBase';
import withSnackbar from './shared/hocs/withSnackbar';

type AppProps = ReduxAuthState;

const App: FC<AppProps> = ({isAuthenticated}) => {
  return isAuthenticated ? <RootNavigator /> : <AuthNavigator />;
};

export default flowRight([withStore, withNativeBase, withNavigationContainer, withSnackbar, withAuthState])(App);
