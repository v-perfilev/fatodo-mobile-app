import {TFunction} from 'i18next';
import {ChatItem, EventMessageParams, EventMessageType, Message} from '../../models/Message';
import {User} from '../../models/User';
import {DateFormatters} from './DateUtils';
import {ArrayUtils} from './ArrayUtils';
import {MapUtils} from './MapUtils';
import {FilterUtils} from './FilterUtils';
import {ComparatorUtils} from './ComparatorUtils';

export class MessageUtils {
  public static filterMessages = (messages: Message[]): Message[] => {
    return messages.filter(FilterUtils.uniqueByIdFilter).sort(ComparatorUtils.createdAtComparator);
  };

  public static findMessage = (messages: Message[], m: Message): Message => {
    return ArrayUtils.findValueWithId(messages, m) || ArrayUtils.findValueWithUserIdAndText(messages, m);
  };

  public static parseEventMessage = (message: Message): EventMessageParams => {
    return message.isEvent ? (JSON.parse(message.text) as EventMessageParams) : null;
  };

  public static buildEventMessageText = (
    message: Message,
    params: EventMessageParams,
    users: Map<string, User>,
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

  public static extractUserFromMessage = (users: Map<string, User>, message: Message): User => {
    return users.get(message.userId);
  };

  public static extractUsernameFromMessage = (users: Map<string, User>, message: Message): string => {
    const user = users.get(message.userId);
    return user?.username || '';
  };

  public static extractUsernamesFromParams = (users: Map<string, User>, params: EventMessageParams): string => {
    const userIds = params?.ids || [];
    const eventUsers = MapUtils.get(users, userIds);
    const eventUsernames = eventUsers.map((user) => user.username);
    return eventUsernames.length > 0 ? eventUsernames.join(', ') : '';
  };

  public static extractTextFromParams = (params: EventMessageParams): string => {
    return params?.text || '';
  };

  public static convertMessagesToChatItems = (messagesToConvert: Message[]): ChatItem[] => {
    const handledDates: string[] = [];
    const handledItems: ChatItem[] = [];
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
}
