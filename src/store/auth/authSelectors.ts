import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../store';

const getAuthState = (state: RootState) => state.auth;

class AuthSelectors {
  static isActive = createSelector(getAuthState, (state) => state.isActive);

  static isSleepMode = createSelector(getAuthState, (state) => state.isSleepMode);

  static isAuthenticated = createSelector(getAuthState, (state) => state.isAuthenticated);

  static account = createSelector(getAuthState, (state) => state.account);

  static loading = createSelector(getAuthState, (state) => state.loading);
}

export default AuthSelectors;
