import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../store';

const getAuthState = (state: RootState) => state.auth;

class AuthSelectors {
  static isAuthenticatedSelector = createSelector(getAuthState, (state) => state.isAuthenticated);
  static accountSelector = createSelector(getAuthState, (state) => state.account);
}

export default AuthSelectors;
