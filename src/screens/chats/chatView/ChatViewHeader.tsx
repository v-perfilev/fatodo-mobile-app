import React from 'react';
import {useChatDialogContext} from '../../../shared/contexts/dialogContexts/ChatDialogContext';
import Header from '../../../components/layouts/Header';
import IconButton from '../../../components/controls/IconButton';
import {Chat} from '../../../models/Chat';
import Menu, {MenuItem, MenuItemProps} from '../../../components/controls/Menu';
import DotsVerticalIcon from '../../../components/icons/DotsVerticalIcon';
import {useTranslation} from 'react-i18next';
import {useAppSelector} from '../../../store/store';
import UsersSelectors from '../../../store/users/usersSelectors';
import MembersIcon from '../../../components/icons/MembersIcon';
import UserPlusIcon from '../../../components/icons/UserPlusIcon';
import EditIcon from '../../../components/icons/EditIcon';
import BroomIcon from '../../../components/icons/BroomIcon';
import LeaveIcon from '../../../components/icons/LeaveIcon';
import DeleteIcon from '../../../components/icons/DeleteIcon';

type ChatViewHeaderProps = {
  title: string;
  chat: Chat;
};

const ChatViewHeader = ({title, chat}: ChatViewHeaderProps) => {
  const {t} = useTranslation();
  const {showChatAddMembersDialog, showChatMembersDialog, showChatRenameDialog} = useChatDialogContext();
  const users = useAppSelector(UsersSelectors.users);

  const openChatAddMembersDialog = (): void => {
    showChatAddMembersDialog(chat);
  };

  const openChatMembersDialog = (): void => {
    showChatMembersDialog(chat, users);
  };

  const openChatRenameDialog = (): void => {
    showChatRenameDialog(chat, title);
  };

  const showMembers = (): void => {
    openChatMembersDialog();
  };

  const addMembers = (): void => {
    openChatAddMembersDialog();
  };

  const renameChat = (): void => {
    openChatRenameDialog();
  };

  const cleanChat = (): void => {
    // TODO clean chat
  };

  const leaveChat = (): void => {
    // TODO clean chat
  };

  const deleteChat = (): void => {
    // TODO deleteChat chat
  };

  const menuItems = [
    {action: showMembers, icon: <MembersIcon color="primary.500" />, text: t('chat:menu.showMembers')},
    {
      action: addMembers,
      icon: <UserPlusIcon color="primary.500" />,
      text: t('chat:menu.addMembers'),
      show: !chat.isDirect,
    },
    {action: renameChat, icon: <EditIcon color="primary.500" />, text: t('chat:menu.renameChat'), show: !chat.isDirect},
    {action: cleanChat, icon: <BroomIcon color="primary.500" />, text: t('chat:menu.cleanChat')},
    {action: leaveChat, icon: <LeaveIcon color="primary.500" />, text: t('chat:menu.leaveChat'), show: !chat.isDirect},
    {action: deleteChat, icon: <DeleteIcon color="error.500" />, text: t('chat:menu.deleteChat'), show: !chat.isDirect},
  ] as MenuItemProps[];

  return (
    <Header title={title}>
      <Menu
        trigger={(triggerProps) => (
          <IconButton {...triggerProps} colorScheme="white" size="lg" p="1.5" icon={<DotsVerticalIcon />} />
        )}
      >
        {menuItems.map((itemProps, index) => (
          <MenuItem {...itemProps} key={index} />
        ))}
      </Menu>
    </Header>
  );
};

export default ChatViewHeader;
