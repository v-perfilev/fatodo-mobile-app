import React, {ComponentType, useMemo} from 'react';
import {useAppSelector} from '../../../store/store';
import {ChatInfo} from '../../../models/Chat';
import {Event} from '../../../models/Event';
import InfoSelectors from '../../../store/info/infoSelectors';
import {User} from '../../../models/User';
import {MapUtils} from '../../utils/MapUtils';
import {MessageInfo, MessageReactionType} from '../../../models/Message';

export type WithEventChatProps = {
  user?: User;
  users?: User[];
  chat?: ChatInfo;
  message?: MessageInfo;
  reaction?: MessageReactionType;
  date?: Date;
};

type ContainerProps = {
  event: Event;
};

const withEventChat =
  (Component: ComponentType<WithEventChatProps>) =>
  ({event}: ContainerProps) => {
    const users = useAppSelector(InfoSelectors.users);
    const chats = useAppSelector(InfoSelectors.chats);
    const messages = useAppSelector(InfoSelectors.messages);
    const chatEvent = event.chatEvent;
    const reaction = chatEvent.reaction;
    const date = event.createdAt;

    const eventUser = useMemo<User>(() => chatEvent.userId && users.get(chatEvent.userId), [users]);
    const eventUsers = useMemo<User[]>(() => chatEvent.userIds && MapUtils.get(users, chatEvent.userIds), [users]);
    const eventChat = useMemo<ChatInfo>(() => chatEvent.chatId && chats.get(chatEvent.chatId), [chats]);
    const eventMessage = useMemo<MessageInfo>(
      () => chatEvent.messageId && messages.get(chatEvent.messageId),
      [messages],
    );

    return (
      <Component
        user={eventUser}
        users={eventUsers}
        chat={eventChat}
        message={eventMessage}
        reaction={reaction}
        date={date}
      />
    );
  };

export default withEventChat;