import {RootState} from '../store';
import {createSelector} from '@reduxjs/toolkit';

const getUsersState = (state: RootState) => state.users;

class UsersSelectors {
  static usersSelector = createSelector(getUsersState, (state) => state.users);

  static loadingSelector = createSelector(getUsersState, (state) => state.loading);
}

export default UsersSelectors;
