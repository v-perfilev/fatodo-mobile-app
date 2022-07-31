import {Text} from 'native-base';
import withEventChat, {WithEventChatProps} from '../../../../../shared/hocs/withEvents/withEventChat';
import {Trans, useTranslation} from 'react-i18next';
import React, {ReactElement} from 'react';
import UserLink from '../../../../../components/links/UserLink';
import ChatLink from '../../../../../components/links/ChatLink';
import EventListItemUsers from '../EventListItemUsers';
import EventListItemTemplate from '../EventListItemTemplate';
import UserView from '../../../../../components/views/UserView';

const EventChatMemberDelete = ({user, chat, users, date}: WithEventChatProps) => {
  const {t} = useTranslation();

  const title = t('event:chat.memberDelete.title');

  const User = (): ReactElement => (user ? <UserLink user={user} /> : null);
  const Chat = (): ReactElement => (chat ? <ChatLink chat={chat}>{t('event:links.chat')}</ChatLink> : null);
  const Users = (): ReactElement => (users ? <EventListItemUsers users={users} /> : null);

  const image = <UserView user={user} picSize="md" />;

  const content = (
    <Text>
      <Trans
        i18nKey="event:chat.memberDelete.content"
        components={{user: <User />, chat: <Chat />, users: <Users />}}
      />
    </Text>
  );

  return <EventListItemTemplate image={image} title={title} content={content} date={date} />;
};

export default withEventChat(EventChatMemberDelete);
