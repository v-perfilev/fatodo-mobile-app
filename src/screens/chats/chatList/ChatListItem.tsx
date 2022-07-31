import {Chat} from '../../../models/Chat';
import {User} from '../../../models/User';
import FHStack from '../../../components/boxes/FHStack';
import {useAppSelector} from '../../../store/store';
import InfoSelectors from '../../../store/info/infoSelectors';
import React, {ReactElement, useMemo} from 'react';
import {ChatUtils} from '../../../shared/utils/ChatUtils';
import {DateFormatters} from '../../../shared/utils/DateUtils';
import UrlPic from '../../../components/surfaces/UrlPic';
import UserView from '../../../components/views/UserView';
import {useTranslation} from 'react-i18next';
import ChatsSelectors from '../../../store/chats/chatsSelectors';
import ChatListMessage from './chatListMessage/ChatListMessage';
import AuthSelectors from '../../../store/auth/authSelectors';
import PressableButton from '../../../components/controls/PressableButton';
import {useNavigation} from '@react-navigation/native';
import {Badge, Text} from 'native-base';
import FVStack from '../../../components/boxes/FVStack';
import {RootNavigationProp} from '../../../navigators/RootNavigator';

type ChatListItemProps = {
  chat: Chat;
};

const ChatListItem = ({chat}: ChatListItemProps) => {
  const navigation = useNavigation<RootNavigationProp>();
  const {t} = useTranslation();
  const unreadMap = useAppSelector(ChatsSelectors.unreadMap);
  const users = useAppSelector(InfoSelectors.users);
  const account = useAppSelector(AuthSelectors.account);

  const goToChat = (): void => navigation.navigate('ChatView', {chat});

  const unreadCount = useMemo<number>(() => {
    const countMap = unreadMap.get(chat.id);
    return countMap?.length || 0;
  }, [unreadMap, chat.id]);

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

  return (
    <PressableButton onPress={goToChat}>
      <FHStack grow defaultSpace>
        {pic}
        <FHStack grow>
          <FVStack grow alignItems="stretch" justifyContent="center">
            <FHStack smallSpace>
              {unreadCount > 0 && (
                <Badge rounded="full" variant="solid" colorScheme="secondary">
                  {unreadCount}
                </Badge>
              )}
              <Text color="primary.500" fontWeight="bold">
                {title}
              </Text>
              {chat.isDirect && <Text color="gray.400">{t('chat:common.direct')}</Text>}
              <Text color="gray.400" fontWeight="bold" fontSize="0.7rem">
                {formattedDate}
              </Text>
            </FHStack>
            <ChatListMessage message={chat.lastMessage} account={account} />
          </FVStack>
        </FHStack>
      </FHStack>
    </PressableButton>
  );
};

export default ChatListItem;
