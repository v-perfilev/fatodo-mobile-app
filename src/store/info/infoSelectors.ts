import {RootState} from '../store';
import {createSelector} from '@reduxjs/toolkit';
import {User} from '../../models/User';
import {ChatInfo} from '../../models/Chat';
import {MessageInfo} from '../../models/Message';
import {CommentInfo} from '../../models/Comment';
import {GroupInfo} from '../../models/Group';
import {ItemInfo} from '../../models/Item';

const getInfoState = (state: RootState) => state.info;

class InfoSelectors {
  static users = createSelector(getInfoState, (state) => new Map<string, User>(state.users));

  static groups = createSelector(getInfoState, (state) => new Map<string, GroupInfo>(state.groups));

  static items = createSelector(getInfoState, (state) => new Map<string, ItemInfo>(state.items));

  static chats = createSelector(getInfoState, (state) => new Map<string, ChatInfo>(state.chats));

  static messages = createSelector(getInfoState, (state) => new Map<string, MessageInfo>(state.messages));

  static comments = createSelector(getInfoState, (state) => new Map<string, CommentInfo>(state.comments));
}

export default InfoSelectors;
