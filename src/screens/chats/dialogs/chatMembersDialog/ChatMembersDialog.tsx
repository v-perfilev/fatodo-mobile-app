import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import ClearableTextInput from '../../../../components/inputs/ClearableTextInput';
import UserPlusIcon from '../../../../components/icons/UserPlusIcon';
import ModalDialog from '../../../../components/modals/ModalDialog';
import {Text} from 'native-base';
import FVStack from '../../../../components/boxes/FVStack';
import FCenter from '../../../../components/boxes/FCenter';
import {Chat} from '../../../../models/Chat';
import ChatMembersDialogMember from './ChatMembersDialogMember';
import {useAppSelector} from '../../../../store/store';
import InfoSelectors from '../../../../store/info/infoSelectors';
import OutlinedButton from '../../../../components/controls/OutlinedButton';
import {User} from '../../../../models/User';

export type ChatMembersDialogProps = {
  chat: Chat;
  show: boolean;
  close: () => void;
  switchToAddMembers: () => void;
};

export const defaultChatMembersDialogProps: Readonly<ChatMembersDialogProps> = {
  chat: null,
  show: false,
  close: (): void => null,
  switchToAddMembers: (): void => null,
};

const ChatMembersDialog = ({chat, show, close, switchToAddMembers}: ChatMembersDialogProps) => {
  const usersSelector = useCallback(InfoSelectors.makeUsersSelector(), []);
  const memberIds = useMemo(() => chat?.members.map((m) => m.userId), [chat]);
  const users = useAppSelector((state) => usersSelector(state, memberIds));
  const {t} = useTranslation();
  const [usersToShow, setUsersToShow] = useState<User[]>([]);
  const [deletedMemberIds, setDeletedMemberIds] = useState<string[]>([]);

  const conditionalClose = (): void => {
    if (deletedMemberIds.length >= 0) {
      setTimeout(() => setDeletedMemberIds([]), 1000);
    }
    close();
  };

  const updateUsersToShow = (filter?: string): void => {
    const updatedUsersToShow = users
      .filter((user) => !deletedMemberIds.includes(user.id))
      .filter((user) => filter === undefined || user.username.includes(filter));
    setUsersToShow(updatedUsersToShow);
  };

  const handleChange = (value: string): void => {
    updateUsersToShow(value);
  };

  const onMemberDelete = (userId: string): void => {
    setDeletedMemberIds((prevState) => [...prevState, userId]);
  };

  useEffect(() => {
    if (chat) {
      updateUsersToShow();
    }
  }, [chat, users, deletedMemberIds]);

  const content = (
    <FVStack space="3">
      <ClearableTextInput placeholder={t('inputs.filter')} onChangeText={handleChange} />
      {usersToShow.length > 0 && (
        <FVStack space="3">
          {usersToShow.map((user) => (
            <ChatMembersDialogMember
              chat={chat}
              user={user}
              onDelete={onMemberDelete}
              close={conditionalClose}
              key={user.id}
            />
          ))}
        </FVStack>
      )}
      {usersToShow.length === 0 && (
        <FCenter>
          <Text color="gray.400">{t('chat:members.usersNotFound')}</Text>
        </FCenter>
      )}
    </FVStack>
  );

  const actions = chat && !chat.isDirect && (
    <OutlinedButton startIcon={<UserPlusIcon />} onPress={switchToAddMembers} colorScheme="primary">
      {t('chat:members.buttons.addUsers')}
    </OutlinedButton>
  );

  return (
    <ModalDialog
      open={show}
      close={conditionalClose}
      title={t('chat:members.title')}
      content={content}
      actions={actions}
      size="xl"
    />
  );
};

export default memo(ChatMembersDialog);
