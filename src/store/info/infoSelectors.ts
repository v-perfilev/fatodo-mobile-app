import {RootState} from '../store';
import {createSelector} from '@reduxjs/toolkit';
import {StoreUtils} from '../../shared/utils/StoreUtils';
import {User} from '../../models/User';
import {GroupInfo} from '../../models/Group';
import {ItemInfo} from '../../models/Item';
import {ChatInfo} from '../../models/Chat';
import {MessageInfo} from '../../models/Message';
import {CommentInfo, CommentThreadInfo} from '../../models/Comment';

const getInfoState = (state: RootState) => state.info;
const getKey = (_: any, key: string) => key;
const getKeys = (_: any, keys: string[]) => keys;

class InfoSelectors {
  static makeUserSelector = () =>
    createSelector([getInfoState, getKey], (state, key) => StoreUtils.getValue(state.users, key, undefined) as User);

  static makeUsersSelector = () =>
    createSelector([getInfoState, getKeys], (state, keys) => StoreUtils.getMultipleValues(state.users, keys) as User[]);

  static makeGroupSelector = () =>
    createSelector(
      [getInfoState, getKey],
      (state, key) => StoreUtils.getValue(state.groups, key, undefined) as GroupInfo,
    );

  static makeGroupsSelector = () =>
    createSelector(
      [getInfoState, getKeys],
      (state, keys) => StoreUtils.getMultipleValues(state.groups, keys) as GroupInfo[],
    );

  static makeItemSelector = () =>
    createSelector(
      [getInfoState, getKey],
      (state, key) => StoreUtils.getValue(state.items, key, undefined) as ItemInfo,
    );

  static makeChatSelector = () =>
    createSelector(
      [getInfoState, getKey],
      (state, key) => StoreUtils.getValue(state.chats, key, undefined) as ChatInfo,
    );

  static makeMessageSelector = () =>
    createSelector(
      [getInfoState, getKey],
      (state, key) => StoreUtils.getValue(state.messages, key, undefined) as MessageInfo,
    );

  static makeCommentSelector = () =>
    createSelector(
      [getInfoState, getKey],
      (state, key) => StoreUtils.getValue(state.comments, key, undefined) as CommentInfo,
    );

  static makeCommentThreadSelector = () =>
    createSelector(
      [getInfoState, getKey],
      (state, key) => StoreUtils.getValue(state.commentThreads, key, undefined) as CommentThreadInfo,
    );
}

export default InfoSelectors;
