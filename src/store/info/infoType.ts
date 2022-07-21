import {User} from '../../models/User';
import {GroupInfo} from '../../models/Group';
import {ItemInfo} from '../../models/Item';
import {ChatInfo} from '../../models/Chat';
import {MessageInfo} from '../../models/Message';
import {CommentInfo} from '../../models/Comment';

export type InfoState = {
  users: User[];
  loadingUserIds: string[];
  groups: GroupInfo[];
  loadingGroupIds: string[];
  items: ItemInfo[];
  loadingItemIds: string[];
  chats: ChatInfo[];
  loadingChatIds: string[];
  messages: MessageInfo[];
  loadingMessageIds: string[];
  comments: CommentInfo[];
  loadingCommentIds: string[];
};
