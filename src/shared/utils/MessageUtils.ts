import {TFunction} from 'i18next';
import {EventMessageParams, EventMessageType, Message} from '../../models/Message';
import {User} from '../../models/User';
import {ChatItem} from '../../models/ChatItem';
import {DateFormatters} from './DateUtils';
import {ArrayUtils} from './ArrayUtils';

export class MessageUtils {
  public static parseEventMessage = (message: Message): EventMessageParams => {
    return message.isEvent ? (JSON.parse(message.text) as EventMessageParams) : null;
  };

  public static buildEventMessageText = (
    message: Message,
    params: EventMessageParams,
    users: User[],
    t: TFunction,
  ): string => {
    const username = MessageUtils.extractUsernameFromMessage(users, message);
    const usernames = MessageUtils.extractUsernamesFromParams(users, params);
    const title = MessageUtils.extractTextFromParams(params);
    let text = '';
    if (
      params?.type === EventMessageType.CREATE_DIRECT_CHAT ||
      params?.type === EventMessageType.CREATE_CHAT ||
      params?.type === EventMessageType.ADD_MEMBERS ||
      params?.type === EventMessageType.DELETE_MEMBERS
    ) {
      text = t('chat:event.' + params.type, {username, usernames});
    } else if (params?.type === EventMessageType.RENAME_CHAT) {
      text = t('chat:event.' + params.type, {username, title});
    } else if (params?.type === EventMessageType.LEAVE_CHAT) {
      text = t('chat:event.' + params.type, {username});
    } else if (params?.type === EventMessageType.CLEAR_CHAT) {
      text = t('chat:event.' + params.type);
    }
    return text;
  };

  public static isMessage = (message: Message): boolean => {
    return message && !message.isEvent;
  };

  public static isIncomingMessage = (message: Message, account: User): boolean => {
    return message && account && message.userId !== account.id;
  };

  public static isReadMessage = (message: Message, account: User): boolean => {
    const readUserIds = message?.statuses.filter((status) => status.type === 'READ').map((status) => status.userId);
    return readUserIds && readUserIds.includes(account?.id);
  };

  public static extractUserIds = (messages: Message[]): string[] => {
    const messageUserIds = messages.map((m) => m.userId);
    const reactionUserIds = messages.flatMap((m) => m.reactions).map((r) => r.userId);
    const statusUserIds = messages.flatMap((m) => m.statuses).map((s) => s.userId);
    const eventUserIds = messages
      .filter((m) => m.isEvent)
      .map((m) => MessageUtils.parseEventMessage(m))
      .flatMap((p) => p.ids);
    return [...messageUserIds, ...reactionUserIds, ...statusUserIds, ...eventUserIds];
  };

  public static extractUserFromMessage = (users: User[], message: Message): User => {
    return users.find((user) => user.id === message.userId);
  };

  public static extractUsernameFromMessage = (users: User[], message: Message): string => {
    const user = users.find((user) => user.id === message.userId);
    return user?.username || '';
  };

  public static extractUsernamesFromParams = (users: User[], params: EventMessageParams): string => {
    const eventUsers = users.filter((user) => params?.ids?.includes(user.id)).map((user) => user.username);
    return eventUsers && eventUsers.length > 0 ? eventUsers.join(', ') : '';
  };

  public static extractTextFromParams = (params: EventMessageParams): string => {
    return params?.text || '';
  };

  public static convertMessagesToChatItems = (messagesToConvert: Message[]): ChatItem[] => {
    const handledDates = [] as string[];
    const handledItems = [] as ChatItem[];
    messagesToConvert.forEach((message) => {
      const date = DateFormatters.formatDateWithYear(new Date(message.createdAt));
      if (!handledDates.includes(date)) {
        handledDates.push(date);
        handledItems.push({date});
      }
      handledItems.push({message});
    });
    return handledItems.reverse();
  };

  public static filterMessages = (messages: Message[]): Message[] => {
    return messages.filter(ArrayUtils.uniqueByIdFilter).sort(ArrayUtils.createdAtComparator);
  };

  public static findMessage = (messages: Message[], m: Message): Message => {
    return ArrayUtils.findValueWithId(messages, m) || ArrayUtils.findValueWithUserIdAndText(messages, m);
  };
}
