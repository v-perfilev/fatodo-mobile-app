import './shared/i18n';
import './shared/axios';

import React, {useEffect, useState} from 'react';
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
  const isAuthenticated = useAppSelector(AuthSelectors.isAuthenticated);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    SecurityUtils.getAuthToken().then(async (token) => {
      if (token) {
        await dispatch(AuthActions.login());
        await dispatch(AuthThunks.fetchAccount());
      }
      setReady(true);
    });
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(ContactsThunks.fetchInfo());
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
  withDialogs,
])(App);
