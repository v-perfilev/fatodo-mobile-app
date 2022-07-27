import {Text} from 'native-base';
import withEventChat, {WithEventChatProps} from '../../../../../shared/hocs/withEvents/withEventChat';
import {Trans, useTranslation} from 'react-i18next';
import React, {ReactElement} from 'react';
import UserLink from '../../../../../components/links/UserLink';
import ChatLink from '../../../../../components/links/ChatLink';
import EventListItemTemplate from '../EventListItemTemplate';
import UserView from '../../../../../components/views/UserView';

const EventChatReaction = ({user, chat, message, reaction, date}: WithEventChatProps) => {
  const {t} = useTranslation();

  const title = t('event:chat.reaction.title');

  const User = (): ReactElement => (user ? <UserLink user={user} /> : null);
  const Chat = (): ReactElement => (chat ? <ChatLink chat={chat}>{t('event:links.chat')}</ChatLink> : null);

  const image = user ? <UserView user={user} picSize="md" /> : null;

  const content = (
    <Text>
      <Trans i18nKey="event:chat.reaction.content" components={{user: <User />, chat: <Chat />}} />
    </Text>
  );

  return <EventListItemTemplate image={image} title={title} content={content} message={message?.text} date={date} />;
};

export default withEventChat(EventChatReaction);
