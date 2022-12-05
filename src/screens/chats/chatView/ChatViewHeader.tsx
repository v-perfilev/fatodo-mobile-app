import React, {useCallback, useMemo} from 'react';
import {useChatDialogContext} from '../../../shared/contexts/dialogContexts/ChatDialogContext';
import Header from '../../../components/layouts/Header';
import Menu, {MenuItemProps, MenuTrigger} from '../../../components/controls/Menu';
import {useTranslation} from 'react-i18next';
import MembersIcon from '../../../components/icons/MembersIcon';
import UserPlusIcon from '../../../components/icons/UserPlusIcon';
import EditIcon from '../../../components/icons/EditIcon';
import BroomIcon from '../../../components/icons/BroomIcon';
import LeaveIcon from '../../../components/icons/LeaveIcon';
import DeleteIcon from '../../../components/icons/DeleteIcon';
import {useNavigation} from '@react-navigation/native';
import {ChatUtils} from '../../../shared/utils/ChatUtils';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import InfoSelectors from '../../../store/info/infoSelectors';
import AuthSelectors from '../../../store/auth/authSelectors';
import ChatSelectors from '../../../store/chat/chatSelectors';
import {ChatActions} from '../../../store/chat/chatActions';
import EyeIcon from '../../../components/icons/EyeIcon';
import ChatsSelectors from '../../../store/chats/chatsSelectors';

const ChatViewHeader = () => {
  const dispatch = useAppDispatch();
  const unreadMessageIdsSelector = useCallback(ChatsSelectors.makeUnreadMessageIdsSelector(), []);
  const usersSelector = useCallback(InfoSelectors.makeUsersSelector(), []);
  const navigation = useNavigation();
  const {t} = useTranslation();
  const {
    showChatAddMembersDialog,
    showChatMembersDialog,
    showChatRenameDialog,
    showChatClearDialog,
    showChatLeaveDialog,
    showChatDeleteDialog,
  } = useChatDialogContext();
  const chat = useAppSelector(ChatSelectors.chat);
  const unreadMessageIds = useAppSelector((state) => unreadMessageIdsSelector(state, chat?.id));
  const memberIds = chat?.members.map((m) => m.userId);
  const users = useAppSelector((state) => usersSelector(state, memberIds));
  const account = useAppSelector(AuthSelectors.account);

  const showMarkAsRead = useMemo<boolean>(() => {
    return unreadMessageIds?.length > 0;
  }, [chat, unreadMessageIds]);

  const title = useMemo<string>(() => {
    return chat ? ChatUtils.getTitle(chat, users, account) : '';
  }, [chat, users, account]);

  const showMembers = (): void => {
    showChatMembersDialog(chat);
  };

  const addMembers = (): void => {
    showChatAddMembersDialog(chat);
  };

  const renameChat = (): void => {
    showChatRenameDialog(chat);
  };

  const cleanChat = (): void => {
    showChatClearDialog(chat);
  };

  const markAsRead = (): void => {
    dispatch(ChatActions.markChatAsReadThunk(chat));
  };

  const leaveChat = (): void => {
    const onSuccess = () => navigation.goBack();
    showChatLeaveDialog(chat, onSuccess);
  };

  const deleteChat = (): void => {
    const onSuccess = () => navigation.goBack();
    showChatDeleteDialog(chat, onSuccess);
  };

  const menuItems: MenuItemProps[] = [
    {action: showMembers, icon: <MembersIcon color="primary.500" />, text: t('chat:menu.showMembers')},
    {
      action: addMembers,
      icon: <UserPlusIcon color="primary.500" />,
      text: t('chat:menu.addMembers'),
      hidden: chat?.isDirect,
    },
    {
      action: renameChat,
      icon: <EditIcon color="primary.500" />,
      text: t('chat:menu.renameChat'),
      hidden: chat?.isDirect,
    },
    {action: cleanChat, icon: <BroomIcon color="primary.500" />, text: t('chat:menu.cleanChat')},
    {
      action: markAsRead,
      text: t('chat:menu.markAsRead'),
      icon: <EyeIcon color="primary.500" />,
      hidden: !showMarkAsRead,
    },
    {
      action: leaveChat,
      icon: <LeaveIcon color="primary.500" />,
      text: t('chat:menu.leaveChat'),
      hidden: chat?.isDirect,
    },
    {
      action: deleteChat,
      icon: <DeleteIcon color="error.500" />,
      text: t('chat:menu.deleteChat'),
      hidden: chat?.isDirect,
    },
  ];

  return (
    <Header title={title}>
      <Menu trigger={MenuTrigger()} menuItems={menuItems} />
    </Header>
  );
};

export default ChatViewHeader;
