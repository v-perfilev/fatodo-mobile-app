import {User} from '../../models/User';
import {GroupInfo} from '../../models/Group';
import {ItemInfo} from '../../models/Item';
import {ChatInfo} from '../../models/Chat';
import {MessageInfo} from '../../models/Message';
import {CommentInfo} from '../../models/Comment';

export type InfoState = {
  users: [string, User][];
  groups: [string, GroupInfo][];
  items: [string, ItemInfo][];
  chats: [string, ChatInfo][];
  messages: [string, MessageInfo][];
  comments: [string, CommentInfo][];

  // loading
  loadingUserIds: string[];
  loadingGroupIds: string[];
  loadingItemIds: string[];
  loadingChatIds: string[];
  loadingMessageIds: string[];
  loadingCommentIds: string[];
};
