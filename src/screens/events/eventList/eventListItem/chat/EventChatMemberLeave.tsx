import withEventChat, {WithEventChatProps} from '../../../../../shared/hocs/withEvents/withEventChat';
import {Trans, useTranslation} from 'react-i18next';
import React from 'react';
import UserLink from '../../../../../components/links/UserLink';
import ChatLink from '../../../../../components/links/ChatLink';
import EventListItemTemplate from '../EventListItemTemplate';
import UserView from '../../../../../components/views/UserView';

const EventChatMemberLeave = ({user, chat, date}: WithEventChatProps) => {
  const {t} = useTranslation();

  const title = t('event:chat.memberLeave.title');

  const image = <UserView user={user} picSize="md" />;

  const context = user?.gender;
  const content = (
    <Trans
      i18nKey="event:chat.memberLeave.content"
      context={context}
      components={{user: <UserLink user={user} />, chat: <ChatLink chat={chat} />}}
    />
  );

  const loading = !user || !chat;

  return <EventListItemTemplate image={image} title={title} content={content} date={date} loading={loading} />;
};

export default withEventChat(EventChatMemberLeave);
