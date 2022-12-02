import {Trans, useTranslation} from 'react-i18next';
import React, {useEffect} from 'react';
import withEventChat, {WithEventChatProps} from '../../../../shared/hocs/withEvents/withEventChat';
import UserView from '../../../views/UserView';
import UserLink from '../../../links/UserLink';
import ChatLink from '../../../links/ChatLink';
import EventListItemUsers from '../../../../screens/events/eventList/eventListItem/EventListItemUsers';
import NotificationTemplate from '../../NotificationTemplate';
import {useNotificationContext} from '../../../../shared/contexts/NotificationContext';
import {useNavigation} from '@react-navigation/native';
import {ProtectedNavigationProp} from '../../../../navigators/ProtectedNavigator';

const NotificationChatCreate = ({user, chat, users}: WithEventChatProps) => {
  const {setReady} = useNotificationContext();
  const navigation = useNavigation<ProtectedNavigationProp>();
  const {t} = useTranslation();

  const goToChat = (): void => navigation.navigate('ChatView', {chatId: chat?.id});

  const title = t('event:chat.create.title');

  const image = <UserView user={user} picSize="sm" />;

  const context = user?.gender;
  const content = (
    <Trans
      i18nKey="event:chat.create.content"
      context={context}
      components={{
        user: <UserLink user={user} noLink />,
        chat: <ChatLink chat={chat} text={t('event:links.chat')} noLink />,
        users: <EventListItemUsers users={users} />,
      }}
    />
  );

  useEffect(() => {
    const ready = user && chat && users.length > 0;
    ready && setReady(true);
  }, [user, chat, users]);

  return <NotificationTemplate image={image} title={title} content={content} onClick={goToChat} />;
};

export default withEventChat(NotificationChatCreate);
