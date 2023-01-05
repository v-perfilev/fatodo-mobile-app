import React, {useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Text} from 'native-base';
import {ChatInfo} from '../../models/Chat';
import {ChatUtils} from '../../shared/utils/ChatUtils';
import {useAppSelector} from '../../store/store';
import AuthSelectors from '../../store/auth/authSelectors';
import InfoSelectors from '../../store/info/infoSelectors';
import {ProtectedNavigationProps} from '../../navigators/ProtectedNavigator';
import {useTranslation} from 'react-i18next';

type ChatLinkProps = {
  chat?: ChatInfo;
  color?: string;
  text?: string;
  noLink?: boolean;
};

export const ChatLink = ({chat, color = 'primary.500', text, noLink}: ChatLinkProps) => {
  const usersSelector = useCallback(InfoSelectors.makeUsersSelector(), []);
  const navigation = useNavigation<ProtectedNavigationProps>();
  const memberIds = chat?.members.map((m) => m.userId) || [];
  const account = useAppSelector(AuthSelectors.account);
  const users = useAppSelector((state) => usersSelector(state, memberIds));
  const {t} = useTranslation();

  const title = text ? text : ChatUtils.getTitle(chat, users, account, t);

  const goToChat = (): void => navigation.navigate('ChatView', {chatId: chat?.id});

  return chat ? (
    <Text color={!noLink ? color : undefined} onPress={!noLink ? goToChat : undefined}>
      {title}
    </Text>
  ) : null;
};

export default ChatLink;
