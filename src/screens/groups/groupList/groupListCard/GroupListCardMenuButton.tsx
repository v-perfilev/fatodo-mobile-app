import React from 'react';
import Menu, {MenuItemProps, MenuTrigger} from '../../../../components/controls/Menu';
import {GroupUtils} from '../../../../shared/utils/GroupUtils';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {GroupNavigationProps} from '../../../../navigators/GroupNavigator';
import PlusIcon from '../../../../components/icons/PlusIcon';
import EyeIcon from '../../../../components/icons/EyeIcon';
import EditIcon from '../../../../components/icons/EditIcon';
import DeleteIcon from '../../../../components/icons/DeleteIcon';
import {Group} from '../../../../models/Group';
import {useGroupDialogContext} from '../../../../shared/contexts/dialogContexts/GroupDialogContext';
import {useAppSelector} from '../../../../store/store';
import AuthSelectors from '../../../../store/auth/authSelectors';
import {IIconButtonProps} from 'native-base';
import {Platform} from 'react-native';
import LeaveIcon from '../../../../components/icons/LeaveIcon';

type GroupListCardMenuButtonProps = IIconButtonProps & {
  group: Group;
};

const GroupListCardMenuButton = ({group}: GroupListCardMenuButtonProps) => {
  const account = useAppSelector(AuthSelectors.account);
  const {t} = useTranslation();
  const navigation = useNavigation<GroupNavigationProps>();
  const {showGroupLeaveDialog, showGroupDeleteDialog} = useGroupDialogContext();

  const canEdit = group && GroupUtils.canEdit(account, group);
  const canAdmin = group && GroupUtils.canAdmin(account, group);
  const canLeave = group && GroupUtils.canLeave(account, group);

  const goToGroupView = (): void => navigation.navigate('GroupView', {group});
  const goToItemCreate = (): void => navigation.navigate('ItemCreate', {group});
  const goToGroupEdit = (): void => navigation.navigate('GroupEdit', {group});

  const openGroupLeaveDialog = (): void => {
    showGroupLeaveDialog(group);
  };

  const openGroupDeleteDialog = (): void => {
    showGroupDeleteDialog(group);
  };

  const menuItems: MenuItemProps[] = [
    {
      action: goToItemCreate,
      icon: <PlusIcon color={`${group.color}.500`} />,
      text: t('group:actions.createItem'),
      hidden: !canEdit,
    },
    {
      action: goToGroupView,
      icon: <EyeIcon color={`${group.color}.500`} />,
      text: t('group:actions.view'),
    },
    {
      action: goToGroupEdit,
      icon: <EditIcon color={`${group.color}.500`} />,
      text: t('group:actions.edit'),
      hidden: !canAdmin,
    },
    {
      icon: <LeaveIcon color="secondary.500" />,
      action: openGroupLeaveDialog,
      text: t('group:actions.leave'),
      disabled: !canLeave,
    },
    {
      action: openGroupDeleteDialog,
      icon: <DeleteIcon color="error.500" />,
      text: t('group:actions.delete'),
      hidden: !canAdmin,
    },
  ];

  const triggerSize = Platform.OS === 'ios' ? 'xl' : 'lg';

  return <Menu trigger={MenuTrigger(triggerSize, group.color)} menuItems={menuItems} color={group.color} />;
};

export default GroupListCardMenuButton;
