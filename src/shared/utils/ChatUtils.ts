import {Chat, ChatInfo} from '../../models/Chat';
import {User, UserAccount} from '../../models/User';
import {ArrayUtils} from './ArrayUtils';
import {ViewToken} from 'react-native';
import {MessageUtils} from './MessageUtils';
import {Message} from '../../models/Message';
import {FilterUtils} from './FilterUtils';
import {ComparatorUtils} from './ComparatorUtils';

export class ChatUtils {
  public static filterChats = (chats: Chat[]): Chat[] => {
    return chats
      .filter(FilterUtils.uniqueByIdFilter)
      .sort((a, b) => ComparatorUtils.createdAtComparator(a.lastMessage, b.lastMessage));
  };

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

  public static calcUnreadCount = (unreadMap: [string, string[]][]): number => {
    const map = new Map(unreadMap);
    return Array.from(map.values()).reduce((a, b) => a + b.length, 0);
  };

  public static addMessageToUnread = (unreadMap: [string, string[]][], message: Message): [string, string[]][] => {
    const map = new Map(unreadMap);
    if (map.has(message.chatId)) {
      map.get(message.chatId).push(message.id);
    } else {
      map.set(message.chatId, [message.id]);
    }
    return [...map];
  };

  public static removeMessageFromUnread = (
    unreadMap: [string, string[]][],
    chatId: string,
    messageId: string,
  ): [string, string[]][] => {
    const map = new Map(unreadMap);
    if (map.has(chatId)) {
      const messageIds = map.get(chatId);
      const updatedMessageIds = ArrayUtils.deleteValue(messageIds, messageId);
      map.set(chatId, updatedMessageIds);
    }
    return [...map];
  };

  public static removeChatFromUnread = (unreadMap: [string, string[]][], chatId: string): [string, string[]][] => {
    const map = new Map(unreadMap);
    map.delete(chatId);
    return [...map];
  };
}
