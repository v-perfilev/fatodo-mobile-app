import {RootState} from '../store';
import {createSelector} from '@reduxjs/toolkit';
import {StoreUtils} from '../../shared/utils/StoreUtils';
import {User} from '../../models/User';
import {Group} from '../../models/Group';
import {Item} from '../../models/Item';
import {Chat} from '../../models/Chat';
import {Message} from '../../models/Message';
import {Comment} from '../../models/Comment';

const getInfoState = (state: RootState) => state.info;

class InfoSelectors {
  static user = createSelector(
    [getInfoState, (state, key: string) => key],
    (state, key) => StoreUtils.getValue(state.users, key, undefined) as User,
  );

  static users = createSelector(
    [getInfoState, (state, keys: string[]) => keys],
    (state, keys) => StoreUtils.getMultipleValues(state.users, keys) as User[],
  );

  static group = createSelector(
    [getInfoState, (state, key: string) => key],
    (state, key) => StoreUtils.getValue(state.groups, key, undefined) as Group,
  );

  static groups = createSelector(
    [getInfoState, (state, keys: string[]) => keys],
    (state, keys) => StoreUtils.getMultipleValues(state.groups, keys) as Group[],
  );

  static item = createSelector(
    [getInfoState, (state, key: string) => key],
    (state, key) => StoreUtils.getValue(state.items, key, undefined) as Item,
  );

  static chat = createSelector(
    [getInfoState, (state, key: string) => key],
    (state, key) => StoreUtils.getValue(state.chats, key, undefined) as Chat,
  );

  static message = createSelector(
    [getInfoState, (state, key: string) => key],
    (state, key) => StoreUtils.getValue(state.messages, key, undefined) as Message,
  );

  static comment = createSelector(
    [getInfoState, (state, key: string) => key],
    (state, key) => StoreUtils.getValue(state.comments, key, undefined) as Comment,
  );
}

export default InfoSelectors;
