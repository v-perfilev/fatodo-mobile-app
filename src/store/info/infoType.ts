import {User} from '../../models/User';
import {GroupInfo} from '../../models/Group';
import {ItemInfo} from '../../models/Item';
import {ChatInfo} from '../../models/Chat';
import {MessageInfo} from '../../models/Message';
import {CommentInfo, CommentThreadInfo} from '../../models/Comment';

export type InfoState = {
  users: [string, User][];
  groups: [string, GroupInfo][];
  items: [string, ItemInfo][];
  chats: [string, ChatInfo][];
  messages: [string, MessageInfo][];
  comments: [string, CommentInfo][];
  commentThreads: [string, CommentThreadInfo][];
};
