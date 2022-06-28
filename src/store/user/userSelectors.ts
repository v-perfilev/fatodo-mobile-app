import {RootState} from '../store';
import {createSelector} from '@reduxjs/toolkit';

const getUserState = (state: RootState) => state.user;

class UserSelectors {
  static user = createSelector(getUserState, (state) => state.user);

  static groups = createSelector(getUserState, (state) => state.groups);

  static loading = createSelector(getUserState, (state) => state.loading);
}

export default UserSelectors;
