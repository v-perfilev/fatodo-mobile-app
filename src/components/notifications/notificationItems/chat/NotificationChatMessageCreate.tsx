import {useTranslation} from 'react-i18next';
import React, {useEffect} from 'react';
import UserView from '../../../views/UserView';
import withEventChat, {WithEventChatProps} from '../../../../shared/hocs/withEvents/withEventChat';
import {Text} from 'native-base';
import NotificationTemplate from '../../NotificationTemplate';
import {useNotificationContext} from '../../../../shared/contexts/NotificationContext';
import {useNavigation} from '@react-navigation/native';
import {ProtectedNavigationProp} from '../../../../navigators/ProtectedNavigator';

const NotificationChatMessageCreate = ({user, chat, message}: WithEventChatProps) => {
  const {setReady} = useNotificationContext();
  const navigation = useNavigation<ProtectedNavigationProp>();
  const {t} = useTranslation();

  const goToChat = (): void => navigation.navigate('ChatView', {chatId: chat?.id});

  const title = t('event:chat.messageCreate.title');

  const author = user?.username;

  const image = <UserView user={user} picSize="sm" />;

  const content = <Text>{message?.text}</Text>;

  useEffect(() => {
    const ready = user && chat && message;
    ready && setReady(true);
  }, [user, chat, message]);

  return <NotificationTemplate image={image} title={title} author={author} content={content} onClick={goToChat} />;
};

export default withEventChat(NotificationChatMessageCreate);
