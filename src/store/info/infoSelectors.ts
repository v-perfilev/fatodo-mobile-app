import {RootState} from '../store';
import {createSelector} from '@reduxjs/toolkit';
import {StoreUtils} from '../../shared/utils/StoreUtils';
import {User} from '../../models/User';
import {Group} from '../../models/Group';
import {Item} from '../../models/Item';
import {Chat} from '../../models/Chat';
import {Message} from '../../models/Message';
import {Comment, CommentThreadInfo} from '../../models/Comment';

const getInfoState = (state: RootState) => state.info;
const getKey = (_: any, key: string) => key;
const getKeys = (_: any, keys: string[]) => keys;

class InfoSelectors {
  static makeUserSelector = () =>
    createSelector([getInfoState, getKey], (state, key) => StoreUtils.getValue(state.users, key, undefined) as User);

  static makeUsersSelector = () =>
    createSelector([getInfoState, getKeys], (state, keys) => StoreUtils.getMultipleValues(state.users, keys) as User[]);

  static makeGroupSelector = () =>
    createSelector([getInfoState, getKey], (state, key) => StoreUtils.getValue(state.groups, key, undefined) as Group);

  static makeGroupsSelector = () =>
    createSelector(
      [getInfoState, getKeys],
      (state, keys) => StoreUtils.getMultipleValues(state.groups, keys) as Group[],
    );

  static makeItemSelector = () =>
    createSelector([getInfoState, getKey], (state, key) => StoreUtils.getValue(state.items, key, undefined) as Item);

  static makeChatSelector = () =>
    createSelector([getInfoState, getKey], (state, key) => StoreUtils.getValue(state.chats, key, undefined) as Chat);

  static makeMessageSelector = () =>
    createSelector(
      [getInfoState, getKey],
      (state, key) => StoreUtils.getValue(state.messages, key, undefined) as Message,
    );

  static makeCommentSelector = () =>
    createSelector(
      [getInfoState, getKey],
      (state, key) => StoreUtils.getValue(state.comments, key, undefined) as Comment,
    );

  static makeCommentThreadSelector = () =>
    createSelector(
      [getInfoState, getKey],
      (state, key) => StoreUtils.getValue(state.commentThreads, key, undefined) as CommentThreadInfo,
    );
}

export default InfoSelectors;
