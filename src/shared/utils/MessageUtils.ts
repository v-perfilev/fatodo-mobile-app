import {TFunction} from 'i18next';
import {EventMessageParams, EventMessageType, Message} from '../../models/Message';
import {User} from '../../models/User';
import {UserUtils} from './UserUtils';

export class MessageUtils {
  public static parseEventMessage = (message: Message): EventMessageParams => {
    return message.isEvent ? (JSON.parse(message.text) as EventMessageParams) : null;
  };

  public static buildEventMessageText = (
    params: EventMessageParams,
    messageUser: User,
    paramUsers: User[],
    t: TFunction,
  ): string => {
    const username = messageUser?.username;
    const context = messageUser?.gender;
    const usernames = paramUsers.map((user) => UserUtils.getUsername(user, t)).join(', ');
    const title = MessageUtils.extractTextFromParams(params);
    let text = '';
    if (
      params?.type === EventMessageType.CREATE_DIRECT_CHAT ||
      params?.type === EventMessageType.CREATE_CHAT ||
      params?.type === EventMessageType.ADD_MEMBERS ||
      params?.type === EventMessageType.DELETE_MEMBERS
    ) {
      text = t('chat:event.' + params.type, {username, usernames, context});
    } else if (params?.type === EventMessageType.RENAME_CHAT) {
      text = t('chat:event.' + params.type, {username, title, context});
    } else if (params?.type === EventMessageType.LEAVE_CHAT) {
      text = t('chat:event.' + params.type, {username, context});
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

  public static extractTextFromParams = (params: EventMessageParams): string => {
    return params?.text || '';
  };
}
