import withEventChat, {WithEventChatProps} from '../../../../../shared/hocs/withEvents/withEventChat';
import {Trans, useTranslation} from 'react-i18next';
import React from 'react';
import UserLink from '../../../../../components/links/UserLink';
import ChatLink from '../../../../../components/links/ChatLink';
import EventListItemUsers from '../EventListItemUsers';
import EventListItemTemplate from '../EventListItemTemplate';
import UserView from '../../../../../components/views/UserView';

const EventChatMemberDelete = ({user, chat, users, date}: WithEventChatProps) => {
  const {t} = useTranslation();

  const title = t('event:chat.memberDelete.title');

  const image = <UserView user={user} picSize="md" />;

  const context = user?.gender;
  const content = (
    <Trans
      i18nKey="event:chat.memberDelete.content"
      context={context}
      components={{
        user: <UserLink user={user} />,
        chat: <ChatLink chat={chat}>{t('event:links.chat')}</ChatLink>,
        users: <EventListItemUsers users={users} />,
      }}
    />
  );

  const loading = !user || !chat || !users.length;

  return <EventListItemTemplate image={image} title={title} content={content} date={date} loading={loading} />;
};

export default withEventChat(EventChatMemberDelete);
