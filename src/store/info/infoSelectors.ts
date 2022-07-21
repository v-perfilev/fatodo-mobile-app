import {RootState} from '../store';
import {createSelector} from '@reduxjs/toolkit';

const getInfoState = (state: RootState) => state.info;

class InfoSelectors {
  static users = createSelector(getInfoState, (state) => state.users);
}

export default InfoSelectors;
