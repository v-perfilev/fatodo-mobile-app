import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../store';

const getAuthState = (state: RootState) => state.snack;

class SnackSelectors {
  static list = createSelector(getAuthState, (state) => state.list);
}

export default SnackSelectors;
