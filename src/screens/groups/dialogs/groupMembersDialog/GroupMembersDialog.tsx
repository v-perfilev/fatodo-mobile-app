import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ReduxAuthState} from '../../../../store/rerducers/AuthReducer';
import {Group, GroupUser} from '../../../../models/Group';
import {User} from '../../../../models/User';
import {GroupUtils} from '../../../../shared/utils/GroupUtils';
import ClearableTextInput from '../../../../components/inputs/ClearableTextInput';
import SolidButton from '../../../../components/controls/SolidButton';
import UserPlusIcon from '../../../../components/icons/UserPlusIcon';
import ModalDialog from '../../../../components/modals/ModalDialog';
import withAuthState from '../../../../shared/hocs/withAuthState';
import {flowRight} from 'lodash';
import {Center, Text, VStack} from 'native-base';
import GroupMembersDialogMember from './GroupMembersDialogMember';

export type GroupMembersDialogProps = {
  group: Group;
  users: User[];
  show: boolean;
  close: () => void;
  onSuccess: () => void;
  switchToAddMembers: () => void;
  switchToEditMember: (user: GroupUser) => void;
};

export const defaultGroupMembersDialogProps: Readonly<GroupMembersDialogProps> = {
  group: null,
  users: [],
  show: false,
  onSuccess: (): void => undefined,
  close: (): void => undefined,
  switchToAddMembers: (): void => undefined,
  switchToEditMember: (): void => undefined,
};

type Props = ReduxAuthState & GroupMembersDialogProps;

const GroupMembersDialog = (props: Props) => {
  const {group, users, show, close, onSuccess, switchToAddMembers, switchToEditMember, account} = props;
  const {t} = useTranslation();
  const [usersToShow, setUsersToShow] = useState<GroupUser[]>([]);
  const [deletedMemberIds, setDeletedMemberIds] = useState<string[]>([]);

  const canAdmin = group && GroupUtils.canAdmin(account, group);

  const conditionalClose = (): void => {
    if (deletedMemberIds.length >= 0) {
      setDeletedMemberIds([]);
      onSuccess();
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
    <VStack>
      <ClearableTextInput placeholder={t('inputs.filter')} onChangeText={filterUsersToShow} />
      {usersToShow.length > 0 && (
        <VStack mt="3" mb="1">
          {usersToShow.map((user) => (
            <GroupMembersDialogMember
              group={group}
              user={user}
              switchToEditMember={switchToEditMember}
              onDelete={onMemberDelete}
              key={user.id}
            />
          ))}
        </VStack>
      )}
      {usersToShow.length === 0 && (
        <Center mt="3" mb="1">
          <Text color="gray.400">{t('group:members.usersNotFound')}</Text>
        </Center>
      )}
    </VStack>
  );

  const actions = group && canAdmin && (
    <SolidButton startIcon={<UserPlusIcon />} onClick={switchToAddMembers} colorScheme="primary">
      {t('group:members.buttons.addUsers')}
    </SolidButton>
  );

  return (
    <ModalDialog
      open={show}
      close={conditionalClose}
      title={t('group:members.title')}
      content={content}
      actions={actions}
    />
  );
};

export default flowRight([withAuthState])(GroupMembersDialog);
