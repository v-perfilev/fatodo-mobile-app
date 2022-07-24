import {User} from '../../models/User';
import {GroupInfo} from '../../models/Group';
import {ItemInfo} from '../../models/Item';
import {ChatInfo} from '../../models/Chat';
import {MessageInfo} from '../../models/Message';
import {CommentInfo} from '../../models/Comment';

export type InfoState = {
  users: [string, User][];
  loadingUserIds: string[];
  groups: [string, GroupInfo][];
  loadingGroupIds: string[];
  items: [string, ItemInfo][];
  loadingItemIds: string[];
  chats: [string, ChatInfo][];
  loadingChatIds: string[];
  messages: [string, MessageInfo][];
  loadingMessageIds: string[];
  comments: [string, CommentInfo][];
  loadingCommentIds: string[];
};
