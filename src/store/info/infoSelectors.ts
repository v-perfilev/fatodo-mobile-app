import {RootState} from '../store';
import {createSelector} from '@reduxjs/toolkit';
import {User} from '../../models/User';

const getInfoState = (state: RootState) => state.info;

class InfoSelectors {
  static users = createSelector(getInfoState, (state) => new Map<string, User>(state.users));
}

export default InfoSelectors;
