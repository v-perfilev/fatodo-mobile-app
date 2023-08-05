import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {UserAccount} from '../../models/User';
import {AppStatus} from './authType';

const getAuthState = (state: RootState) => state.auth;

class AuthSelectors {
  static isActive = createSelector(getAuthState, (state) => state.isActive as boolean);

  static isAuthenticated = createSelector(getAuthState, (state) => state.isAuthenticated as boolean);

  static appStatus = createSelector(getAuthState, (state) => state.appStatus as AppStatus);

  static account = createSelector(getAuthState, (state) => state.account as UserAccount);

  static loading = createSelector(getAuthState, (state) => state.loading as boolean);
}

export default AuthSelectors;
