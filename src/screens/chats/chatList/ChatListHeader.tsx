import React from 'react';
import {useChatDialogContext} from '../../../shared/contexts/dialogContexts/ChatDialogContext';
import Header from '../../../components/layouts/Header';
import PlusIcon from '../../../components/icons/PlusIcon';
import IconButton from '../../../components/controls/IconButton';

const ChatListHeader = () => {
  const {showChatCreateDialog} = useChatDialogContext();

  const openCreateChatDialog = (): void => {
    showChatCreateDialog();
  };

  return (
    <Header hideGoBack>
      <IconButton colorScheme="white" icon={<PlusIcon />} onPress={openCreateChatDialog} />
    </Header>
  );
};

export default ChatListHeader;
