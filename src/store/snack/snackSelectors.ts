import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {ReduxSnack} from './snackType';

const getAuthState = (state: RootState) => state.snack;

class SnackSelectors {
  static list = createSelector(getAuthState, (state) => state.list as ReduxSnack[]);
}

export default SnackSelectors;
