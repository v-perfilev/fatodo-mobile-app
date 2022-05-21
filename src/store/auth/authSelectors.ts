import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../store';

const getAuthState = (state: RootState) => state.auth;

class AuthSelectors {
  static isAuthenticatedSelector = createSelector(getAuthState, (state) => state.isAuthenticated);
  static accountSelector = createSelector(getAuthState, (state) => state.account);
  static loadingSelector = createSelector(getAuthState, (state) => state.loading);
}

export default AuthSelectors;
