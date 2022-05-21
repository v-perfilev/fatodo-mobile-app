import React from 'react';
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
import {useGroupDialogContext} from '../../../shared/contexts/dialogContexts/GroupDialogContext';
import {useAppSelector} from '../../../store/store';
import UsersSelectors from '../../../store/users/usersSelectors';

type GroupViewMenuProps = {
  account: UserAccount;
};

const GroupViewMenu = ({account}: GroupViewMenuProps) => {
  const users = useAppSelector(UsersSelectors.usersSelector);
  const navigation = useNavigation<GroupNavigationProp>();
  const {group, load: loadGroup} = useGroupViewContext();
  const {showGroupMembersDialog, showGroupAddMembersDialog, showGroupLeaveDialog, showGroupDeleteDialog} =
    useGroupDialogContext();
  const {t} = useTranslation();

  const goToGroupList = (): void => {
    navigation.navigate('GroupList');
  };

  const goToItemCreate = (): void => {
    navigation.navigate('ItemCreate', {groupId: group.id});
  };

  const goToGroupEdit = (): void => {
    navigation.navigate('GroupEdit', {groupId: group.id});
  };

  const openGroupMembersDialog = (): void => {
    const onSuccess = (): void => loadGroup(group.id, goToGroupList);
    showGroupMembersDialog(group, users, onSuccess);
  };

  const openGroupAddMembersDialog = (): void => {
    const onSuccess = (): void => loadGroup(group.id, goToGroupList);
    showGroupAddMembersDialog(group, onSuccess);
  };

  const openGroupLeaveDialog = (): void => {
    const onSuccess = (): void => goToGroupList();
    showGroupLeaveDialog(group, onSuccess);
  };

  const openGroupDeleteDialog = (): void => {
    const onSuccess = (): void => goToGroupList();
    showGroupDeleteDialog(group, onSuccess);
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
      color: 'secondary',
      disabled: !canLeave,
    },
    {
      icon: <DeleteIcon />,
      action: openGroupDeleteDialog,
      text: t('group:actions.delete'),
      color: 'secondary',
      hidden: !canAdmin,
    },
  ] as MenuElement[];

  return <ControlMenu menu={menuElements} />;
};

export default GroupViewMenu;
