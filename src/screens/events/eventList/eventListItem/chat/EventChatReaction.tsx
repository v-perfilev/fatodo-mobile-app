import withEventChat, {WithEventChatProps} from '../../../../../shared/hocs/withEvents/withEventChat';
import {Trans, useTranslation} from 'react-i18next';
import React, {ReactElement} from 'react';
import UserLink from '../../../../../components/links/UserLink';
import ChatLink from '../../../../../components/links/ChatLink';
import EventListItemTemplate from '../EventListItemTemplate';
import UserReactionView from '../../../../../components/views/UserReactionView';

const EventChatReaction = ({user, chat, message, reaction, date}: WithEventChatProps) => {
  const {t} = useTranslation();

  const title = t('event:chat.reaction.title');

  const User = (): ReactElement => (user ? <UserLink user={user} /> : null);
  const Chat = (): ReactElement => (chat ? <ChatLink chat={chat}>{t('event:links.chat')}</ChatLink> : null);

  const image = <UserReactionView user={user} size="md" reactionType={reaction} />;

  const context = user?.gender;
  const content = (
    <Trans i18nKey="event:chat.reaction.content" context={context} components={{user: <User />, chat: <Chat />}} />
  );

  const loading = !user || !chat || !message;

  return (
    <EventListItemTemplate
      image={image}
      title={title}
      content={content}
      message={message?.text}
      date={date}
      loading={loading}
    />
  );
};

export default withEventChat(EventChatReaction);
