import withEventChat, {WithEventChatProps} from '../../../../../shared/hocs/withEvents/withEventChat';
import EventListItemTemplate from '../EventListItemTemplate';
import UserLink from '../../../../../components/links/UserLink';
import {Trans, useTranslation} from 'react-i18next';
import React from 'react';
import ChatLink from '../../../../../components/links/ChatLink';
import UserListLInks from '../../../../../components/links/UserListLinks';
import UserView from '../../../../../components/views/UserView';

const EventChatCreate = ({user, chat, users, date}: WithEventChatProps) => {
  const {t} = useTranslation();

  const title = t('event:chat.create.title');

  const image = <UserView user={user} picSize="md" />;

  const context = user?.gender;
  const content = (
    <Trans
      i18nKey="event:chat.create.content"
      context={context}
      components={{
        user: <UserLink user={user} />,
        chat: <ChatLink chat={chat} text={t('event:links.chat')} />,
        users: <UserListLInks users={users} />,
      }}
    />
  );

  const loading = !user || !chat || !users.length;

  return <EventListItemTemplate image={image} title={title} content={content} date={date} loading={loading} />;
};

export default withEventChat(EventChatCreate);
