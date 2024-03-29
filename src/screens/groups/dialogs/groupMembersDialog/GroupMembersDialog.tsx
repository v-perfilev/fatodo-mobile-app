import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Group, GroupUser} from '../../../../models/Group';
import {GroupUtils} from '../../../../shared/utils/GroupUtils';
import ClearableTextInput from '../../../../components/inputs/ClearableTextInput';
import UserPlusIcon from '../../../../components/icons/UserPlusIcon';
import ModalDialog from '../../../../components/modals/ModalDialog';
import {Text} from 'native-base';
import GroupMembersDialogMember from './GroupMembersDialogMember';
import FVStack from '../../../../components/boxes/FVStack';
import FCenter from '../../../../components/boxes/FCenter';
import {useAppSelector} from '../../../../store/store';
import AuthSelectors from '../../../../store/auth/authSelectors';
import InfoSelectors from '../../../../store/info/infoSelectors';
import OutlinedButton from '../../../../components/controls/OutlinedButton';

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
  const usersSelector = useCallback(InfoSelectors.makeUsersSelector(), []);
  const memberIds = useMemo(() => group?.members.map((m) => m.userId), [group]);
  const account = useAppSelector(AuthSelectors.account);
  const users = useAppSelector((state) => usersSelector(state, memberIds));
  const {t} = useTranslation();
  const [usersToShow, setUsersToShow] = useState<GroupUser[]>([]);
  const [deletedMemberIds, setDeletedMemberIds] = useState<string[]>([]);

  const canAdmin = group && GroupUtils.canAdmin(account, group);

  const conditionalClose = (): void => {
    if (deletedMemberIds.length >= 0) {
      setTimeout(() => setDeletedMemberIds([]), 1000);
    }
    close();
  };

  const updateUsersToShow = (filter?: string): void => {
    const memberMap = new Map(group.members.map((member) => [member.userId, member]));
    const updatedUsersToShow = users
      .filter((user) => !deletedMemberIds.includes(user.id))
      .filter((user) => filter === undefined || user.username.includes(filter))
      .map((user) => ({...user, ...memberMap.get(user.id)}));
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
    <FVStack space="3">
      <ClearableTextInput placeholder={t('inputs.filter')} onChangeText={filterUsersToShow} />
      {usersToShow.length > 0 && (
        <FVStack space="3">
          {usersToShow.map((user) => (
            <GroupMembersDialogMember
              group={group}
              user={user}
              switchToEditMember={switchToEditMember}
              onDelete={onMemberDelete}
              close={close}
              key={user.userId}
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
    <OutlinedButton startIcon={<UserPlusIcon />} onPress={switchToAddMembers} colorScheme="primary">
      {t('group:members.buttons.addUsers')}
    </OutlinedButton>
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

export default memo(GroupMembersDialog);
