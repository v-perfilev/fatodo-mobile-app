import IconButton from '../../../components/controls/IconButton';
import ClearableTextInput from '../../../components/inputs/ClearableTextInput';
import FHStack from '../../../components/boxes/FHStack';
import React, {Dispatch, SetStateAction} from 'react';
import {useTranslation} from 'react-i18next';
import PlusIcon from '../../../components/icons/PlusIcon';
import FBox from '../../../components/boxes/FBox';
import {useChatDialogContext} from '../../../shared/contexts/dialogContexts/ChatDialogContext';

type ChatListHeaderProps = {
  setFilter: Dispatch<SetStateAction<string>>;
};

const ChatListHeader = ({setFilter}: ChatListHeaderProps) => {
  const {t} = useTranslation();
  const {showChatCreateDialog} = useChatDialogContext();

  const openCreateChatDialog = (): void => {
    showChatCreateDialog();
  };

  return (
    <FHStack defaultSpace alignItems="center" pt="3" px="3">
      <IconButton icon={<PlusIcon />} onPress={openCreateChatDialog} />
      <FBox>
        <ClearableTextInput placeholder={t('inputs.filter')} onChangeText={setFilter} />
      </FBox>
    </FHStack>
  );
};

export default ChatListHeader;
