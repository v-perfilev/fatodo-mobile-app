import React from 'react';
import Menu, {MenuItem, MenuItemProps, MenuTrigger} from '../../../../components/controls/Menu';
import {GroupUtils} from '../../../../shared/utils/GroupUtils';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {GroupNavigationProp} from '../../../../navigators/GroupNavigator';
import PlusIcon from '../../../../components/icons/PlusIcon';
import EyeIcon from '../../../../components/icons/EyeIcon';
import EditIcon from '../../../../components/icons/EditIcon';
import DeleteIcon from '../../../../components/icons/DeleteIcon';
import {Group} from '../../../../models/Group';
import {useGroupDialogContext} from '../../../../shared/contexts/dialogContexts/GroupDialogContext';
import {useAppSelector} from '../../../../store/store';
import AuthSelectors from '../../../../store/auth/authSelectors';
import {IIconButtonProps} from 'native-base';

type GroupListCardMenuButtonProps = IIconButtonProps & {
  group: Group;
};

const GroupListCardMenuButton = ({group}: GroupListCardMenuButtonProps) => {
  const account = useAppSelector(AuthSelectors.account);
  const {t} = useTranslation();
  const navigation = useNavigation<GroupNavigationProp>();
  const {showGroupDeleteDialog} = useGroupDialogContext();

  const canEdit = group && GroupUtils.canEdit(account, group);
  const canAdmin = group && GroupUtils.canAdmin(account, group);

  const goToGroupView = (): void => navigation.navigate('GroupView', {group});
  const goToItemCreate = (): void => navigation.navigate('ItemCreate', {group});
  const goToGroupEdit = (): void => navigation.navigate('GroupEdit', {group});

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
      action: openGroupDeleteDialog,
      icon: <DeleteIcon color="error.500" />,
      text: t('group:actions.delete'),
      hidden: !canAdmin,
    },
  ];

  return (
    <Menu trigger={MenuTrigger('lg', group.color)}>
      {menuItems.map((itemProps, index) => (
        <MenuItem {...itemProps} key={index} />
      ))}
    </Menu>
  );
};

export default GroupListCardMenuButton;
