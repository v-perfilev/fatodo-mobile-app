import {Chat} from '../../../models/Chat';
import {User} from '../../../models/User';
import FHStack from '../../../components/surfaces/FHStack';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import UsersSelectors from '../../../store/users/usersSelectors';
import React, {ReactElement, useEffect, useMemo} from 'react';
import UsersThunks from '../../../store/users/usersThunks';
import {ChatUtils} from '../../../shared/utils/ChatUtils';
import {DateFormatters} from '../../../shared/utils/DateUtils';
import UrlPic from '../../../components/surfaces/UrlPic';
import UserView from '../../../components/views/UserView';
import FVStack from '../../../components/surfaces/FVStack';
import {useTranslation} from 'react-i18next';
import {Badge, Text} from 'native-base';
import ChatsSelectors from '../../../store/chats/chatsSelectors';
import ChatListItemMessage from './ChatListItemMessage';
import AuthSelectors from '../../../store/auth/authSelectors';
import PressableButton from '../../../components/controls/PressableButton';
import {useNavigation} from '@react-navigation/native';
import {ChatNavigationProp} from '../../../navigators/ChatNavigator';

type ChatListItemProps = {
  chat: Chat;
};

const ChatListItem = ({chat}: ChatListItemProps) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<ChatNavigationProp>();
  const {t} = useTranslation();
  const unreadMessageCountMap = useAppSelector(ChatsSelectors.unreadMessageCountMap);
  const users = useAppSelector(UsersSelectors.users);
  const account = useAppSelector(AuthSelectors.account);

  const goToChat = (): void => navigation.navigate('ChatView', {chatId: chat.id});

  const unreadCount = useMemo<number>(() => {
    return unreadMessageCountMap.get(chat.id);
  }, [unreadMessageCountMap, chat.id]);

  const directUser = useMemo<User>(() => {
    return ChatUtils.getDirectChatUser(chat, users, account);
  }, [chat, users, account]);

  const title = useMemo<string>(() => {
    return ChatUtils.getTitle(chat, users, account);
  }, [chat, users, account]);

  const date = useMemo(() => {
    return chat.lastMessage?.createdAt ? new Date(chat.lastMessage.createdAt) : null;
  }, [chat.lastMessage]);

  const formattedDate = useMemo<string>(() => {
    return date ? DateFormatters.formatDependsOnDay(date) : null;
  }, [date]);

  const pic = useMemo<ReactElement>(() => {
    return directUser ? (
      <UserView user={directUser} picSize="md" />
    ) : (
      <UrlPic alt={null} url={null} size="md" border={1} />
    );
  }, [directUser]);

  useEffect(() => {
    const userIds = chat.members;
    dispatch(UsersThunks.handleUserIds(userIds));
  }, []);

  return (
    <PressableButton onPress={goToChat} mx="3" mb="3">
      <FHStack grow defaultSpace>
        {pic}
        <FVStack smallSpace justifyContent="center">
          <FHStack smallSpace>
            {unreadCount > 0 && (
              <Badge rounded="full" variant="solid" colorScheme="secondary">
                {unreadCount}
              </Badge>
            )}
            <Text>{title}</Text>
            {chat.isDirect && <Text color="gray.400">{t('chat:common.direct')}</Text>}
            <Text color="gray.400" fontWeight="bold" fontSize="0.7rem">
              {formattedDate}
            </Text>
          </FHStack>
          <ChatListItemMessage message={chat.lastMessage} account={account} />
        </FVStack>
      </FHStack>
    </PressableButton>
  );
};

export default ChatListItem;
