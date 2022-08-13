import withEventChat, {WithEventChatProps} from '../../../../../shared/hocs/withEvents/withEventChat';
import {Trans, useTranslation} from 'react-i18next';
import React, {ReactElement} from 'react';
import UserLink from '../../../../../components/links/UserLink';
import ChatLink from '../../../../../components/links/ChatLink';
import EventListItemUsers from '../EventListItemUsers';
import EventListItemTemplate from '../EventListItemTemplate';
import UserView from '../../../../../components/views/UserView';

const EventChatMemberAdd = ({user, chat, users, date}: WithEventChatProps) => {
  const {t} = useTranslation();

  const title = t('event:chat.memberAdd.title');

  const User = (): ReactElement => (user ? <UserLink user={user} /> : null);
  const Chat = (): ReactElement => <ChatLink chat={chat}>{t('event:links.chat')}</ChatLink>;
  const Users = (): ReactElement => <EventListItemUsers users={users} />;

  const image = <UserView user={user} picSize="md" />;

  const content = (
    <Trans i18nKey="event:chat.memberAdd.content" components={{user: <User />, chat: <Chat />, users: <Users />}} />
  );

  return <EventListItemTemplate image={image} title={title} content={content} date={date} />;
};

export default withEventChat(EventChatMemberAdd);
