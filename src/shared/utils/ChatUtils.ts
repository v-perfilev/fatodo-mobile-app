import {Chat, ChatInfo} from '../../models/Chat';
import {User, UserAccount} from '../../models/User';
import {ViewToken} from 'react-native';
import {MessageUtils} from './MessageUtils';
import {FilterUtils} from './FilterUtils';

export class ChatUtils {
  public static getDirectChatUser = (chat: Chat, users: User[], account: User): User => {
    const memberId = chat.members.map((m) => m.userId).find((id) => id !== account.id);
    return chat.isDirect && memberId ? users.find((u) => u.id === memberId) : undefined;
  };

  public static getTitle = (chat: Chat | ChatInfo, users: User[], account: User): string => {
    return chat.title
      ? chat.title
      : chat.members
          .map((m) => m.userId)
          .filter((id) => id !== account.id)
          .map((id) => users.find((u) => u.id === id))
          .filter(FilterUtils.notUndefinedFilter)
          .map((user) => user.username)
          .join(', ');
  };

  public static extractUserIds = (chats: Chat[]): string[] => {
    const chatUserIds = chats.flatMap((c) => c.members).map((m) => m.userId);
    const lastMessageUserIds = chats.map((c) => c.lastMessage.userId);
    const eventUserIds = chats
      .map((c) => c.lastMessage)
      .filter((m) => m.isEvent)
      .map((m) => MessageUtils.parseEventMessage(m))
      .flatMap((p) => p.ids);
    return [...chatUserIds, ...lastMessageUserIds, ...eventUserIds];
  };

  public static getUnreadIds = (
    info: {viewableItems: ViewToken[]; changed: ViewToken[]},
    account: UserAccount,
  ): string[] => {
    return info.viewableItems
      .map((token) => token.item)
      .filter((item) => MessageUtils.isMessage(item.message))
      .filter((item) => MessageUtils.isIncomingMessage(item.message, account))
      .filter((item) => !MessageUtils.isReadMessage(item.message, account))
      .map((item) => item.message.id);
  };
}
