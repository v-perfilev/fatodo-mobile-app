import React, {Dispatch, SetStateAction} from 'react';
import DeleteIcon from '../../../components/icons/DeleteIcon';
import EditIcon from '../../../components/icons/EditIcon';
import {useTranslation} from 'react-i18next';
import LeaveIcon from '../../../components/icons/LeaveIcon';
import UserPlusIcon from '../../../components/icons/UserPlusIcon';
import MembersIcon from '../../../components/icons/MembersIcon';
import {useNavigation} from '@react-navigation/native';
import {GroupNavigationProp} from '../../../navigators/GroupNavigator';
import {GroupUtils} from '../../../shared/utils/GroupUtils';
import {useGroupDialogContext} from '../../../shared/contexts/dialogContexts/GroupDialogContext';
import {useAppSelector} from '../../../store/store';
import GroupSelectors from '../../../store/group/groupSelectors';
import Header from '../../../components/layouts/Header';
import AuthSelectors from '../../../store/auth/authSelectors';
import Menu, {MenuItem, MenuItemProps} from '../../../components/controls/Menu';
import IconButton from '../../../components/controls/IconButton';
import DotsVerticalIcon from '../../../components/icons/DotsVerticalIcon';
import ArchiveIcon from '../../../components/icons/ArchiveIcon';
import PlayIcon from '../../../components/icons/PlayIcon';

type GroupViewHeaderProps = {
  showArchived: boolean;
  setShowArchived: Dispatch<SetStateAction<boolean>>;
};

const GroupViewHeader = ({showArchived, setShowArchived}: GroupViewHeaderProps) => {
  const navigation = useNavigation<GroupNavigationProp>();
  const {showGroupMembersDialog, showGroupAddMembersDialog, showGroupLeaveDialog, showGroupDeleteDialog} =
    useGroupDialogContext();
  const {t} = useTranslation();
  const group = useAppSelector(GroupSelectors.group);
  const account = useAppSelector(AuthSelectors.account);

  const toggleShowArchived = (): void => setShowArchived((prevState) => !prevState);

  const goToGroupList = (): void => navigation.navigate('GroupList');

  const goToGroupEdit = (): void => navigation.navigate('GroupEdit', {group});

  const openGroupMembersDialog = (): void => {
    showGroupMembersDialog(group);
  };

  const openGroupAddMembersDialog = (): void => {
    showGroupAddMembersDialog(group);
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
  const canLeave = group && GroupUtils.canLeave(account, group);

  const menuElements: MenuItemProps[] = [
    {icon: <EditIcon color="primary.500" />, action: goToGroupEdit, text: t('group:actions.edit'), hidden: !canAdmin},
    {icon: <MembersIcon color="primary.500" />, action: openGroupMembersDialog, text: t('group:actions.members')},
    {
      icon: <UserPlusIcon color="primary.500" />,
      action: openGroupAddMembersDialog,
      text: t('group:actions.addMembers'),
      hidden: !canAdmin,
    },
    {
      icon: <LeaveIcon color="secondary.500" />,
      action: openGroupLeaveDialog,
      text: t('group:actions.leave'),
      disabled: !canLeave,
    },
    {
      icon: <DeleteIcon color="error.500" />,
      action: openGroupDeleteDialog,
      text: t('group:actions.delete'),
      hidden: !canAdmin,
    },
  ];

  const switchArchivedIcon = showArchived ? <ArchiveIcon /> : <PlayIcon />;

  return (
    <Header title={group?.title} imageFilename={group?.imageFilename}>
      <IconButton colorScheme="white" size="xl" p="1.5" icon={switchArchivedIcon} onPress={toggleShowArchived} />
      <Menu
        trigger={(triggerProps) => (
          <IconButton {...triggerProps} colorScheme="white" size="xl" p="1.5" icon={<DotsVerticalIcon />} />
        )}
      >
        {menuElements.map((itemProps, index) => (
          <MenuItem {...itemProps} key={index} />
        ))}
      </Menu>
    </Header>
  );
};

export default GroupViewHeader;
