import {Chat} from '../../../models/Chat';
import FHStack from '../../../components/boxes/FHStack';
import {useAppSelector} from '../../../store/store';
import InfoSelectors from '../../../store/info/infoSelectors';
import React, {useCallback} from 'react';
import {ChatUtils} from '../../../shared/utils/ChatUtils';
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
import DateView from '../../../components/views/DateView';

type ChatListItemProps = {
  chat: Chat;
};

const ChatListItem = ({chat}: ChatListItemProps) => {
  const unreadMessageIdsSelector = useCallback(ChatsSelectors.makeUnreadMessageIdsSelector(), []);
  const usersSelector = useCallback(InfoSelectors.makeUsersSelector(), []);
  const navigation = useNavigation<RootNavigationProp>();
  const {t} = useTranslation();
  const memberIds = chat.members.map((m) => m.userId);
  const unreadMessageIds = useAppSelector((state) => unreadMessageIdsSelector(state, chat.id));
  const users = useAppSelector((state) => usersSelector(state, memberIds));
  const account = useAppSelector(AuthSelectors.account);

  const goToChat = (): void => navigation.navigate('ChatView', {chat});

  const unreadCount = unreadMessageIds.length;
  const directUser = ChatUtils.getDirectChatUser(chat, users, account);
  const title = ChatUtils.getTitle(chat, users, account);
  const date = chat.lastMessage?.createdAt ? new Date(chat.lastMessage.createdAt) : null;

  const pic = directUser ? (
    <UserView user={directUser} picSize="md" />
  ) : (
    <UrlPic file={undefined} size={'md'} border={1} />
  );

  return (
    <PressableButton onPress={goToChat}>
      <FHStack px="3" py="2" grow defaultSpace>
        {pic}
        <FHStack grow>
          <FVStack grow alignItems="stretch" justifyContent="center">
            <FHStack smallSpace alignItems="center">
              <FHStack grow smallSpace alignItems="center">
                <Text color="primary.500" fontWeight="bold">
                  {title}
                </Text>
                {chat.isDirect && <Text color="gray.400">{t('chat:common.direct')}</Text>}
                {unreadCount > 0 && (
                  <Badge rounded="full" variant="solid" colorScheme="secondary">
                    {unreadCount}
                  </Badge>
                )}
              </FHStack>
              <Text color="gray.400" fontSize="xs" fontWeight="bold">
                <DateView date={date} timeFormat="FULL" dateFormat="DEPENDS_ON_DAY" />
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
