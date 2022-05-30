import React from 'react';
import {useTranslation} from 'react-i18next';
import Menu, {MenuItem, MenuItemProps} from '../../../../components/controls/Menu';
import PressableButton from '../../../../components/controls/PressableButton';
import {Message} from '../../../../models/Message';
import {useChatDialogContext} from '../../../../shared/contexts/dialogContexts/ChatDialogContext';
import EyeIcon from '../../../../components/icons/EyeIcon';
import EditIcon from '../../../../components/icons/EditIcon';
import DeleteIcon from '../../../../components/icons/DeleteIcon';
import DotsVerticalIcon from '../../../../components/icons/DotsVerticalIcon';
import ReactionsIcon from '../../../../components/icons/ReactionsIcon';

type ChatViewMessageMenuProps = {
  message: Message;
  isOutcoming: boolean;
};

const ChatViewMessageMenu = ({message, isOutcoming}: ChatViewMessageMenuProps) => {
  const {t} = useTranslation();
  const {showMessageReactionsDialog, showMessageReadStatusesDialog, showMessageEditDialog, showMessageDeleteDialog} =
    useChatDialogContext();

  const openReactionsDialog = (): void => {
    showMessageReactionsDialog(message);
  };

  const openReadStatusesDialog = (): void => {
    showMessageReadStatusesDialog(message);
  };

  const editMessage = (): void => {
    showMessageEditDialog(message);
  };

  const deleteMessage = (): void => {
    showMessageDeleteDialog(message);
  };

  const menuItems = [
    {
      action: openReactionsDialog,
      icon: <ReactionsIcon color="primary.500" />,
      text: t('chat:message.actions.reactions'),
    },
    {
      action: openReadStatusesDialog,
      icon: <EyeIcon color="primary.500" />,
      text: t('chat:message.actions.readStatuses'),
    },
    {
      action: editMessage,
      icon: <EditIcon color="primary.500" />,
      text: t('chat:message.actions.edit'),
      hidden: !isOutcoming || message.isDeleted,
    },
    {
      action: deleteMessage,
      icon: <DeleteIcon color="error.500" />,
      text: t('chat:message.actions.delete'),
      hidden: !isOutcoming || message.isDeleted,
    },
  ] as MenuItemProps[];

  return (
    <Menu
      trigger={(triggerProps) => (
        <PressableButton {...triggerProps}>
          <DotsVerticalIcon color="primary.500" size="md" />
        </PressableButton>
      )}
    >
      {menuItems.map((itemProps, index) => (
        <MenuItem {...itemProps} key={index} />
      ))}
    </Menu>
  );
};

export default ChatViewMessageMenu;
