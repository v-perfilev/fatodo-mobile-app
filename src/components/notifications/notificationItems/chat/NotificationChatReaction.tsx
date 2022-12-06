import React, {useEffect} from 'react';
import {Trans, useTranslation} from 'react-i18next';
import withEventChat, {WithEventChatProps} from '../../../../shared/hocs/withEvents/withEventChat';
import UserReactionView from '../../../views/UserReactionView';
import UserLink from '../../../links/UserLink';
import ChatLink from '../../../links/ChatLink';
import NotificationTemplate from '../../NotificationTemplate';
import {useNotificationContext} from '../../../../shared/contexts/NotificationContext';
import {useNavigation} from '@react-navigation/native';
import {ProtectedNavigationProps} from '../../../../navigators/ProtectedNavigator';

const NotificationChatReaction = ({user, chat, reaction}: WithEventChatProps) => {
  const {setReady} = useNotificationContext();
  const navigation = useNavigation<ProtectedNavigationProps>();
  const {t} = useTranslation();

  const goToChat = (): void => navigation.navigate('ChatView', {chatId: chat?.id});

  const title = t('event:chat.reaction.title');

  const image = <UserReactionView user={user} size="sm" reactionType={reaction} />;

  const context = user?.gender;
  const content = (
    <Trans
      i18nKey="event:chat.reaction.content"
      context={context}
      components={{
        user: <UserLink user={user} noLink />,
        chat: <ChatLink chat={chat} text={t('event:links.chat')} noLink />,
      }}
    />
  );

  useEffect(() => {
    const ready = user && chat;
    ready && setReady(true);
  }, [user, chat]);

  return <NotificationTemplate image={image} title={title} content={content} onClick={goToChat} />;
};

export default withEventChat(NotificationChatReaction);
