import './shared/i18n';
import './shared/axios';

import React, {FC, PropsWithChildren, useEffect, useState} from 'react';
import {flowRight} from 'lodash';
import {ReduxAuthState} from './store/rerducers/AuthReducer';
import {bindActionCreators} from 'redux';
import {enqueueReduxSnack} from './store/actions/SnackActions';
import setupAxiosInterceptors from './shared/axios';
import {clearAuth, login, requestAccountData} from './store/actions/AuthActions';
import store from './store/store';
import withStore from './shared/hocs/withStore';
import AuthNavigator from './navigators/AuthNavigator';
import RootNavigator from './navigators/RootNavigator';
import withNativeBase from './shared/hocs/withNativeBase';
import withNavigationContainer from './shared/hocs/withNavigationContainer';
import withSnackbar from './shared/hocs/withSnackbar';
import withAuthState from './shared/hocs/withAuthState';
import {SecurityUtils} from './shared/utils/SecurityUtils';
import {connect, ConnectedProps} from 'react-redux';

// setup axios
const axiosActions = bindActionCreators({clearAuth, enqueueReduxSnack}, store.dispatch);
setupAxiosInterceptors({
  onUnauthenticated: axiosActions.clearAuth,
  enqueueReduxSnackbar: axiosActions.enqueueReduxSnack,
});

const mapDispatchToProps = {login, requestAccountData};
const connector = connect(null, mapDispatchToProps);

type AppProps = ReduxAuthState & PropsWithChildren<ConnectedProps<typeof connector>>;

const App: FC<AppProps> = ({isAuthenticated, login, requestAccountData}) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    SecurityUtils.getAuthToken().then((token) => {
      if (token) {
        login();
        requestAccountData();
      }
      setReady(true);
    });
  }, []);

  return (
    <>
      {ready && isAuthenticated && <RootNavigator />}
      {ready && !isAuthenticated && <AuthNavigator />}
    </>
  );
};

export default flowRight([withStore, connector, withNativeBase, withNavigationContainer, withSnackbar, withAuthState])(
  App,
);
