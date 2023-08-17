import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {UserAccount} from '../../models/User';
import {NavigatorState, ServerState} from './authType';

const getAuthState = (state: RootState) => state.auth;

class AuthSelectors {
  static isActive = createSelector(getAuthState, (state) => state.isActive as boolean);

  static isAuthenticated = createSelector(getAuthState, (state) => !!state.account as boolean);

  static serverState = createSelector(getAuthState, (state) => state.serverState as ServerState);

  static navigatorState = createSelector(getAuthState, (state) => state.navigatorState as NavigatorState);

  static account = createSelector(getAuthState, (state) => state.account as UserAccount);

  static loading = createSelector(getAuthState, (state) => state.loading as boolean);
}

export default AuthSelectors;
