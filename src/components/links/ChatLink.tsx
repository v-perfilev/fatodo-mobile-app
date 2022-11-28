import React, {useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Text} from 'native-base';
import {ChatInfo} from '../../models/Chat';
import {ChatUtils} from '../../shared/utils/ChatUtils';
import {useAppSelector} from '../../store/store';
import AuthSelectors from '../../store/auth/authSelectors';
import InfoSelectors from '../../store/info/infoSelectors';
import {ProtectedNavigationProp} from '../../navigators/ProtectedNavigator';

type ChatLinkProps = {
  chat?: ChatInfo;
  color?: string;
  text?: string;
};

export const ChatLink = ({chat, color = 'primary.500', text}: ChatLinkProps) => {
  const usersSelector = useCallback(InfoSelectors.makeUsersSelector(), []);
  const navigation = useNavigation<ProtectedNavigationProp>();
  const memberIds = chat?.members.map((m) => m.userId) || [];
  const account = useAppSelector(AuthSelectors.account);
  const users = useAppSelector((state) => usersSelector(state, memberIds));
  const title = text ? text : chat ? ChatUtils.getTitle(chat, users, account) : undefined;

  const goToChat = (): void => navigation.navigate('ChatView', {chatId: chat?.id});

  return chat ? (
    <Text color={color} onPress={goToChat}>
      {title}
    </Text>
  ) : null;
};

export default ChatLink;
