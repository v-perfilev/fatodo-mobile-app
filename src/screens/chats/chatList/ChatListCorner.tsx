import React from 'react';
import {useChatDialogContext} from '../../../shared/contexts/dialogContexts/ChatDialogContext';
import PlusIcon from '../../../components/icons/PlusIcon';
import CornerButton from '../../../components/controls/CornerButton';

const ChatListCorner = () => {
  const {showChatCreateDialog} = useChatDialogContext();

  const openCreateChatDialog = (): void => {
    showChatCreateDialog();
  };

  return <CornerButton size="2xl" icon={<PlusIcon />} onPress={openCreateChatDialog} />;
};

export default ChatListCorner;
