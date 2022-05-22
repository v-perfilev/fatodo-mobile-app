import {RootState} from '../store';
import {createSelector} from '@reduxjs/toolkit';

const getUsersState = (state: RootState) => state.users;

class UsersSelectors {
  static users = createSelector(getUsersState, (state) => state.users);

  static loading = createSelector(getUsersState, (state) => state.loading);
}

export default UsersSelectors;
