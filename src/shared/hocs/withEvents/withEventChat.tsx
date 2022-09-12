import React, {ComponentType, useCallback} from 'react';
import {useAppSelector} from '../../../store/store';
import {ChatInfo} from '../../../models/Chat';
import {Event} from '../../../models/Event';
import InfoSelectors from '../../../store/info/infoSelectors';
import {User} from '../../../models/User';
import {MessageInfo, MessageReactionType} from '../../../models/Message';

export type WithEventChatProps = {
  user?: User;
  users?: User[];
  chat?: ChatInfo;
  message?: MessageInfo;
  reaction?: MessageReactionType;
  date?: number;
};

type ContainerProps = {
  event: Event;
};

const withEventChat =
  (Component: ComponentType<WithEventChatProps>) =>
  ({event}: ContainerProps) => {
    const userSelector = useCallback(InfoSelectors.makeUserSelector(), []);
    const usersSelector = useCallback(InfoSelectors.makeUsersSelector(), []);
    const chatSelector = useCallback(InfoSelectors.makeChatSelector(), []);
    const messageSelector = useCallback(InfoSelectors.makeMessageSelector(), []);
    const chatEvent = event.chatEvent;
    const reaction = chatEvent.reaction;
    const date = event.date;

    const user = useAppSelector((state) => userSelector(state, chatEvent.userId));
    const users = useAppSelector((state) => usersSelector(state, chatEvent.userIds));
    const chat = useAppSelector((state) => chatSelector(state, chatEvent.chatId));
    const message = useAppSelector((state) => messageSelector(state, chatEvent.messageId));

    return <Component user={user} users={users} chat={chat} message={message} reaction={reaction} date={date} />;
  };

export default withEventChat;
