import {Chat} from '../../models/Chat';
import {User, UserAccount} from '../../models/User';
import {ArrayUtils} from './ArrayUtils';
import {ViewToken} from 'react-native';
import {MessageUtils} from './MessageUtils';

export class ChatUtils {
  public static getDirectChatUser = (chat: Chat, users: User[], account: User): User => {
    return chat.isDirect ? users.find((user) => chat.members.includes(user.id) && user.id !== account.id) : null;
  };

  public static getTitle = (chat: Chat, users: User[], account: User): string => {
    return chat.title
      ? chat.title
      : users
          .filter((user) => chat.members.includes(user.id) && user.id !== account.id)
          .map((user) => user.username)
          .join(', ');
  };

  public static getUnreadIds = (
    info: {viewableItems: ViewToken[]; changed: ViewToken[]},
    account: UserAccount,
  ): string[] => {
    return info.viewableItems
      .map((token) => token.item)
      .filter((item) => MessageUtils.isIncomingMessage(item.message, account))
      .filter((item) => !MessageUtils.isReadMessage(item.message, account))
      .map((item) => item.message.id);
  };

  public static filterChats = (chats: Chat[]): Chat[] => {
    return chats
      .filter(ArrayUtils.uniqueByIdFilter)
      .sort((a, b) => ArrayUtils.createdAtComparator(a.lastMessage, b.lastMessage));
  };
}
