import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {User} from '../../../../models/User';
import ClearableTextInput from '../../../../components/inputs/ClearableTextInput';
import UserPlusIcon from '../../../../components/icons/UserPlusIcon';
import ModalDialog from '../../../../components/modals/ModalDialog';
import {Text} from 'native-base';
import GhostButton from '../../../../components/controls/GhostButton';
import FVStack from '../../../../components/boxes/FVStack';
import FCenter from '../../../../components/boxes/FCenter';
import {Chat} from '../../../../models/Chat';
import ChatMembersDialogMember from './ChatMembersDialogMember';
import {useAppSelector} from '../../../../store/store';
import UsersSelectors from '../../../../store/users/usersSelectors';

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
  const {t} = useTranslation();
  const [usersToShow, setUsersToShow] = useState<User[]>([]);
  const users = useAppSelector(UsersSelectors.users);

  const filterUsersToShow = (text: string): void => {
    const updatedUsersToShow = users.filter((user) => chat.members.includes(user.id) && user.username.includes(text));
    setUsersToShow(updatedUsersToShow);
  };

  useEffect(() => {
    if (chat) {
      const updatedUsersToShow = users.filter((user) => chat.members.includes(user.id));
      setUsersToShow(updatedUsersToShow);
    }
  }, [chat, users]);

  const content = (
    <FVStack defaultSpace>
      <ClearableTextInput placeholder={t('inputs.filter')} onChangeText={filterUsersToShow} />
      {usersToShow.length > 0 && (
        <FVStack defaultSpace>
          {usersToShow.map((user) => (
            <ChatMembersDialogMember chat={chat} user={user} key={user.id} />
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
    <GhostButton startIcon={<UserPlusIcon />} onClick={switchToAddMembers} colorScheme="primary">
      {t('chat:members.buttons.addUsers')}
    </GhostButton>
  );

  return (
    <ModalDialog
      open={show}
      close={close}
      title={t('chat:members.title')}
      content={content}
      actions={actions}
      size="xl"
    />
  );
};

export default ChatMembersDialog;
