import React, {FC} from 'react';
import {MenuElement} from '../../../models/MenuElement';
import DeleteIcon from '../../../components/icons/DeleteIcon';
import EditIcon from '../../../components/icons/EditIcon';
import PlusIcon from '../../../components/icons/PlusIcon';
import {useTranslation} from 'react-i18next';
import LeaveIcon from '../../../components/icons/LeaveIcon';
import UserPlusIcon from '../../../components/icons/UserPlusIcon';
import MembersIcon from '../../../components/icons/MembersIcon';
import ControlMenu from '../../../components/layouts/ControlMenu';
import {useNavigation} from '@react-navigation/native';
import {GroupNavigationProp} from '../../../navigators/GroupNavigator';
import {useGroupViewContext} from '../../../shared/contexts/viewContexts/groupViewContext';
import {GroupUtils} from '../../../shared/utils/GroupUtils';
import {UserAccount} from '../../../models/User';

type GroupViewMenuProps = {
  account: UserAccount;
};

const GroupViewMenu: FC<GroupViewMenuProps> = ({account}) => {
  const {group} = useGroupViewContext();
  const navigation = useNavigation<GroupNavigationProp>();
  const {t} = useTranslation();

  const goToItemCreate = (): void => {
    navigation.navigate('ItemCreate', {groupId: group.id});
  };

  const goToGroupEdit = (): void => {
    navigation.navigate('GroupEdit', {groupId: group.id});
  };

  const openGroupMembersDialog = (): void => {
    // const onSuccess = (): void => loadGroup(groupId, redirectToNotFound, redirectToGroups);
    // showGroupMembersDialog(group, users, onSuccess);
    console.log('groupMembers');
  };

  const openGroupAddMembersDialog = (): void => {
    // const onSuccess = (): void => loadGroup(groupId, redirectToNotFound, redirectToGroups);
    // showGroupAddMembersDialog(group, onSuccess);
    console.log('addMembers');
  };

  const openGroupDeleteDialog = (): void => {
    // const onSuccess = (): void => redirectToGroups();
    // showGroupDeleteDialog(group, onSuccess);
    console.log('deleteGroup');
  };

  const openGroupLeaveDialog = (): void => {
    // const onSuccess = (): void => redirectToGroups();
    // showGroupLeaveDialog(group, onSuccess);
    console.log('leaveGroup');
  };

  const canAdmin = group && GroupUtils.canAdmin(account, group);
  const canEdit = group && GroupUtils.canAdmin(account, group);
  const canLeave = group && GroupUtils.canLeave(account, group);

  const menuElements = [
    {icon: <PlusIcon />, action: goToItemCreate, text: t('group:actions.create'), hidden: !canEdit},
    {icon: <EditIcon />, action: goToGroupEdit, text: t('group:actions.edit'), hidden: !canAdmin},
    {icon: <MembersIcon />, action: openGroupMembersDialog, text: t('group:actions.members')},
    {
      icon: <UserPlusIcon />,
      action: openGroupAddMembersDialog,
      text: t('group:actions.addMembers'),
      hidden: !canAdmin,
    },
    {
      icon: <LeaveIcon />,
      action: openGroupLeaveDialog,
      text: t('group:actions.leave'),
      color: 'secondary.500',
      disabled: !canLeave,
    },
    {
      icon: <DeleteIcon />,
      action: openGroupDeleteDialog,
      text: t('group:actions.delete'),
      color: 'secondary.500',
      hidden: !canAdmin,
    },
  ] as MenuElement[];

  return <ControlMenu menu={menuElements} />;
};

export default GroupViewMenu;
