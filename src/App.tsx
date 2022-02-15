import './shared/i18n';
import './shared/axios';

import React, {FC} from 'react';
import {flowRight} from 'lodash';
import {ReduxAuthState} from './store/rerducers/AuthReducer';
import withNavigationContainer from './shared/hocs/withNavigationContainer';
import withStore from './shared/hocs/withStore';
import withAuthState from './shared/hocs/withAuthState';
import RootNavigator from './navigators/RootNavigator';
import AuthNavigator from './navigators/AuthNavigator';
import withNativeBase from './shared/hocs/withNativeBase';
import withSnackbar from './shared/hocs/withSnackbar';
import {StatusBar, useTheme} from 'native-base';

type AppProps = ReduxAuthState;

const App: FC<AppProps> = ({isAuthenticated}) => {
  const theme = useTheme();
  const backgroundColor = theme.colors.gray['100'];

  return (
    <>
      <StatusBar backgroundColor={backgroundColor} barStyle="dark-content" />
      {!isAuthenticated ? <RootNavigator /> : <AuthNavigator />}
    </>
  );
};

export default flowRight([withStore, withNativeBase, withNavigationContainer, withSnackbar, withAuthState])(App);
