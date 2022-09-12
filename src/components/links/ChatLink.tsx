import React, {PropsWithChildren, useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Text} from 'native-base';
import {ChatInfo} from '../../models/Chat';
import {ChatUtils} from '../../shared/utils/ChatUtils';
import {useAppSelector} from '../../store/store';
import AuthSelectors from '../../store/auth/authSelectors';
import InfoSelectors from '../../store/info/infoSelectors';
import {RootNavigationProp} from '../../navigators/RootNavigator';

type ChatLinkProps = PropsWithChildren<{
  chat: ChatInfo;
  color?: string;
}>;

export const ChatLink = ({chat, color = 'primary.500', children}: ChatLinkProps) => {
  const usersSelector = useCallback(InfoSelectors.makeUsersSelector(), []);
  const navigation = useNavigation<RootNavigationProp>();
  const memberIds = chat.members.map((m) => m.userId);
  const account = useAppSelector(AuthSelectors.account);
  const users = useAppSelector((state) => usersSelector(state, memberIds));
  const title = children || ChatUtils.getTitle(chat, users, account);

  const goToChat = (): void => navigation.navigate('ChatView', {chatId: chat.id});

  return (
    <Text color={color} onPress={goToChat}>
      {title}
    </Text>
  );
};

export default ChatLink;
