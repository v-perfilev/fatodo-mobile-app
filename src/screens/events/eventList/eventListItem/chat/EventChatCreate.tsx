import withEventChat, {WithEventChatProps} from '../../../../../shared/hocs/withEvents/withEventChat';
import EventListItemTemplate from '../EventListItemTemplate';
import UserLink from '../../../../../components/links/UserLink';
import {Trans, useTranslation} from 'react-i18next';
import React, {ReactElement} from 'react';
import ChatLink from '../../../../../components/links/ChatLink';
import {Text} from 'native-base';
import EventListItemUsers from '../EventListItemUsers';

const EventChatCreate = ({user, chat, users, date}: WithEventChatProps) => {
  const {t} = useTranslation();

  const title = t('event:chat.create.title');

  const User = (): ReactElement => (user ? <UserLink user={user} /> : null);
  const Chat = (): ReactElement => (chat ? <ChatLink chat={chat}>{t('event:links.chat')}</ChatLink> : null);
  const Users = (): ReactElement => (users ? <EventListItemUsers users={users} /> : null);

  let content = (
    <Text>
      <Trans i18nKey="event:chat.create.content" components={{user: <User />, chat: <Chat />, users: <Users />}} />
    </Text>
  );

  return <EventListItemTemplate title={title} content={content} date={date} />;
};

export default withEventChat(EventChatCreate);
