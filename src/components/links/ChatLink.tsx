import React, {PropsWithChildren} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Text} from 'native-base';
import {ChatInfo} from '../../models/Chat';
import {ChatUtils} from '../../shared/utils/ChatUtils';
import {useAppSelector} from '../../store/store';
import AuthSelectors from '../../store/auth/authSelectors';
import InfoSelectors from '../../store/info/infoSelectors';
import {TabNavigationProp} from '../../navigators/TabNavigator';

type ChatLinkProps = PropsWithChildren<{
  chat: ChatInfo;
  color?: string;
}>;

export const ChatLink = ({chat, color = 'primary.500', children}: ChatLinkProps) => {
  const navigation = useNavigation<TabNavigationProp>();
  const account = useAppSelector(AuthSelectors.account);
  const users = useAppSelector(InfoSelectors.users);
  const title = children || ChatUtils.getTitle(chat, users, account);

  const goToChat = (): void => navigation.navigate('Chats', {screen: 'ChatView', params: {chatId: chat.id}});

  return (
    <Text color={color} onPress={goToChat}>
      {title}
    </Text>
  );
};

export default ChatLink;
