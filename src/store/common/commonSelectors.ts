import {RootState} from '../store';
import {createSelector} from '@reduxjs/toolkit';

const getCommon = (state: RootState) => state.common;

class CommonSelectors {
  static freezeTabs = createSelector(getCommon, (state) => state.freezeTabs as boolean);

  static freezeCalendar = createSelector(getCommon, (state) => state.freezeCalendar as boolean);
}

export default CommonSelectors;
