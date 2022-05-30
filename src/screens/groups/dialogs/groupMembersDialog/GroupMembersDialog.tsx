import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Group, GroupUser} from '../../../../models/Group';
import {GroupUtils} from '../../../../shared/utils/GroupUtils';
import ClearableTextInput from '../../../../components/inputs/ClearableTextInput';
import UserPlusIcon from '../../../../components/icons/UserPlusIcon';
import ModalDialog from '../../../../components/modals/ModalDialog';
import {Text} from 'native-base';
import GroupMembersDialogMember from './GroupMembersDialogMember';
import GhostButton from '../../../../components/controls/GhostButton';
import FVStack from '../../../../components/boxes/FVStack';
import FCenter from '../../../../components/boxes/FCenter';
import {useAppSelector} from '../../../../store/store';
import AuthSelectors from '../../../../store/auth/authSelectors';
import UsersSelectors from '../../../../store/users/usersSelectors';

export type GroupMembersDialogProps = {
  group: Group;
  show: boolean;
  close: () => void;
  switchToAddMembers: () => void;
  switchToEditMember: (user: GroupUser) => void;
};

export const defaultGroupMembersDialogProps: Readonly<GroupMembersDialogProps> = {
  group: null,
  show: false,
  close: (): void => null,
  switchToAddMembers: (): void => null,
  switchToEditMember: (): void => null,
};

const GroupMembersDialog = ({group, show, close, switchToAddMembers, switchToEditMember}: GroupMembersDialogProps) => {
  const {t} = useTranslation();
  const account = useAppSelector(AuthSelectors.account);
  const users = useAppSelector(UsersSelectors.users);
  const [usersToShow, setUsersToShow] = useState<GroupUser[]>([]);
  const [deletedMemberIds, setDeletedMemberIds] = useState<string[]>([]);

  const canAdmin = group && GroupUtils.canAdmin(account, group);

  const conditionalClose = (): void => {
    if (deletedMemberIds.length >= 0) {
      setDeletedMemberIds([]);
    }
    close();
  };

  const updateUsersToShow = (filter?: string): void => {
    const memberMap = new Map(group.members.map((member) => [member.id, member]));
    const updatedUsersToShow = users
      .filter((user) => !deletedMemberIds.includes(user.id))
      .filter((user) => memberMap.has(user.id))
      .map((user) => ({...user, ...memberMap.get(user.id)}))
      .filter((user) => filter === undefined || user.username.includes(filter));
    setUsersToShow(updatedUsersToShow);
  };

  const filterUsersToShow = (text: string): void => {
    updateUsersToShow(text);
  };

  const onMemberDelete = (userId: string): void => {
    setDeletedMemberIds((prevState) => [...prevState, userId]);
  };

  useEffect(() => {
    if (group) {
      updateUsersToShow();
    }
  }, [group, deletedMemberIds]);

  const content = (
    <FVStack defaultSpace>
      <ClearableTextInput placeholder={t('inputs.filter')} onChangeText={filterUsersToShow} />
      {usersToShow.length > 0 && (
        <FVStack defaultSpace>
          {usersToShow.map((user) => (
            <GroupMembersDialogMember
              group={group}
              user={user}
              switchToEditMember={switchToEditMember}
              onDelete={onMemberDelete}
              key={user.id}
            />
          ))}
        </FVStack>
      )}
      {usersToShow.length === 0 && (
        <FCenter>
          <Text color="gray.400">{t('group:members.usersNotFound')}</Text>
        </FCenter>
      )}
    </FVStack>
  );

  const actions = group && canAdmin && (
    <GhostButton startIcon={<UserPlusIcon />} onClick={switchToAddMembers} colorScheme="primary">
      {t('group:members.buttons.addUsers')}
    </GhostButton>
  );

  return (
    <ModalDialog
      open={show}
      close={conditionalClose}
      title={t('group:members.title')}
      content={content}
      actions={actions}
      size="xl"
    />
  );
};

export default GroupMembersDialog;
