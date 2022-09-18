import {RootState} from '../store';
import {createSelector} from '@reduxjs/toolkit';
import {User} from '../../models/User';
import {Group} from '../../models/Group';
import {ContactRelation} from '../../models/Contact';

const getUserState = (state: RootState) => state.user;

class UserSelectors {
  static user = createSelector(getUserState, (state) => state.user as User);

  static groups = createSelector(getUserState, (state) => state.groups as Group[]);

  static relations = createSelector(getUserState, (state) => state.relations as ContactRelation[]);
}

export default UserSelectors;
