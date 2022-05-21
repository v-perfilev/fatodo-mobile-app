import './shared/i18n';
import './shared/axios';

import React, {useEffect, useState} from 'react';
import {flowRight} from 'lodash';
import {bindActionCreators} from 'redux';
import setupAxiosInterceptors from './shared/axios';
import withStore from './shared/hocs/withStore';
import AuthNavigator from './navigators/AuthNavigator';
import withNativeBase from './shared/hocs/withNativeBase';
import withNavigationContainer from './shared/hocs/withNavigationContainer';
import {SecurityUtils} from './shared/utils/SecurityUtils';
import withDialogs from './shared/hocs/withDialogs/withDialogs';
import withSnackProvider from './shared/hocs/withSnack/withSnackProvider';
import withSnackDisplay from './shared/hocs/withSnack/withSnackDisplay';
import withContactInfo from './shared/hocs/withContacts/withContactInfo';
import withContacts from './shared/hocs/withContacts/withContacts';
import {store} from './store/store';
import {useAppDispatch, useAppSelector} from './store/hooks';
import AuthSelectors from './store/auth/authSelectors';
import AuthActions from './store/auth/authActions';
import SnackActions from './store/snack/snackActions';
import RootNavigator from './navigators/RootNavigator';

// setup axios
const axiosActions = bindActionCreators(
  {
    logout: AuthActions.logout,
    enqueueSnack: SnackActions.enqueueSnack,
  },
  store.dispatch,
);
setupAxiosInterceptors({
  onUnauthenticated: axiosActions.logout,
  enqueueSnack: axiosActions.enqueueSnack,
});

const App = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(AuthSelectors.isAuthenticatedSelector);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    SecurityUtils.getAuthToken().then((token) => {
      if (token) {
        dispatch(AuthActions.login());
        dispatch(AuthActions.requestAccountData());
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

export default flowRight([
  withStore,
  withSnackDisplay,
  withSnackProvider,
  withNativeBase,
  withNavigationContainer,
  withContactInfo,
  withContacts,
  withDialogs,
])(App);
