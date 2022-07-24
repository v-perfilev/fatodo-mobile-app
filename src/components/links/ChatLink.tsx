import React, {PropsWithChildren} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Text} from 'native-base';
import {ChatInfo} from '../../models/Chat';
import {RootNavigationProp} from '../../navigators/RootNavigator';
import {ChatUtils} from '../../shared/utils/ChatUtils';
import {useAppSelector} from '../../store/store';
import AuthSelectors from '../../store/auth/authSelectors';
import InfoSelectors from '../../store/info/infoSelectors';

type ChatLinkProps = PropsWithChildren<{
  chat: ChatInfo;
}>;

export const ChatLink = ({chat, children}: ChatLinkProps) => {
  const navigation = useNavigation<RootNavigationProp>();
  const account = useAppSelector(AuthSelectors.account);
  const users = useAppSelector(InfoSelectors.users);
  const title = children || ChatUtils.getTitle(chat, users, account);

  const goToChat = (): void => navigation.navigate('ChatView', {chatId: chat.id});

  return (
    <Text color="primary.500" onPress={goToChat}>
      {title}
    </Text>
  );
};

export default ChatLink;
