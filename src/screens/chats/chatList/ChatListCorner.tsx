import React from 'react';
import {useChatDialogContext} from '../../../shared/contexts/dialogContexts/ChatDialogContext';
import CornerButton from '../../../components/controls/CornerButton';
import PlusIcon from '../../../components/icons/PlusIcon';

const ChatListCorner = () => {
  const {showChatCreateDialog} = useChatDialogContext();

  const openCreateChatDialog = (): void => {
    showChatCreateDialog();
  };

  return <CornerButton icon={<PlusIcon />} onPress={openCreateChatDialog} />;
};

export default ChatListCorner;
