import {RootState} from '../store';
import {createSelector} from '@reduxjs/toolkit';

const getCommon = (state: RootState) => state.common;

class CommonSelectors {
  static freeze = createSelector(getCommon, (state) => state.freeze as boolean);
}

export default CommonSelectors;
