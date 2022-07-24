import {Text} from 'native-base';
import withEventChat, {WithEventChatProps} from '../../../../../shared/hocs/withEvents/withEventChat';
import {Trans, useTranslation} from 'react-i18next';
import React, {ReactElement} from 'react';
import UserLink from '../../../../../components/links/UserLink';
import ChatLink from '../../../../../components/links/ChatLink';
import EventListItemUsers from '../EventListItemUsers';
import EventListItemTemplate from '../EventListItemTemplate';

const EventChatMemberDelete = ({user, chat, users, date}: WithEventChatProps) => {
  const {t} = useTranslation();

  const title = t('event:chat.memberDelete.title');

  const User = (): ReactElement => <UserLink user={user} />;
  const Chat = (): ReactElement => <ChatLink chat={chat}>{t('event:links.chat')}</ChatLink>;
  const Users = (): ReactElement => <EventListItemUsers users={users} />;

  let content = (
    <Text>
      <Trans
        i18nKey="event:chat.memberDelete.content"
        components={{user: <User />, chat: <Chat />, users: <Users />}}
      />
    </Text>
  );

  return <EventListItemTemplate title={title} content={content} date={date} />;
};

export default withEventChat(EventChatMemberDelete);
