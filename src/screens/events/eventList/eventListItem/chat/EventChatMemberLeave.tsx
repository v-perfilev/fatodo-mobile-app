import {Text} from 'native-base';
import withEventChat, {WithEventChatProps} from '../../../../../shared/hocs/withEvents/withEventChat';
import {Trans, useTranslation} from 'react-i18next';
import React, {ReactElement} from 'react';
import UserLink from '../../../../../components/links/UserLink';
import ChatLink from '../../../../../components/links/ChatLink';
import EventListItemTemplate from '../EventListItemTemplate';

const EventChatMemberLeave = ({user, chat, date}: WithEventChatProps) => {
  const {t} = useTranslation();

  const title = t('event:chat.memberLeave.title');

  const User = (): ReactElement => (user ? <UserLink user={user} /> : null);
  const Chat = (): ReactElement => (chat ? <ChatLink chat={chat} /> : null);

  let content = (
    <Text>
      <Trans i18nKey="event:chat.memberLeave.content" components={{user: <User />, chat: <Chat />}} />
    </Text>
  );

  return <EventListItemTemplate title={title} content={content} date={date} />;
};

export default withEventChat(EventChatMemberLeave);