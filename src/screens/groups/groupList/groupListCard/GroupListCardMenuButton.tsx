import React from 'react';
import Menu, {MenuItem, MenuItemProps} from '../../../../components/controls/Menu';
import {GroupUtils} from '../../../../shared/utils/GroupUtils';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {GroupNavigationProp} from '../../../../navigators/GroupNavigator';
import PlusIcon from '../../../../components/icons/PlusIcon';
import EyeIcon from '../../../../components/icons/EyeIcon';
import EditIcon from '../../../../components/icons/EditIcon';
import DeleteIcon from '../../../../components/icons/DeleteIcon';
import DotsVerticalIcon from '../../../../components/icons/DotsVerticalIcon';
import RoundButton from '../../../../components/controls/RoundButton';
import {Group} from '../../../../models/Group';
import {useGroupDialogContext} from '../../../../shared/contexts/dialogContexts/GroupDialogContext';
import {useAppSelector} from '../../../../store/store';
import AuthSelectors from '../../../../store/auth/authSelectors';

type GroupListCardMenuButtonProps = {
  group: Group;
};

const GroupListCardMenuButton = ({group}: GroupListCardMenuButtonProps) => {
  const account = useAppSelector(AuthSelectors.account);
  const {t} = useTranslation();
  const navigation = useNavigation<GroupNavigationProp>();
  const {showGroupDeleteDialog} = useGroupDialogContext();

  const canEdit = group && GroupUtils.canEdit(account, group);
  const canAdmin = group && GroupUtils.canAdmin(account, group);

  const goToGroupView = (): void => navigation.navigate('GroupView', {groupId: group.id, colorScheme: group.color});
  const goToItemCreate = (): void => navigation.navigate('ItemCreate', {groupId: group.id, colorScheme: group.color});
  const goToGroupEdit = (): void => navigation.navigate('GroupEdit', {groupId: group.id, colorScheme: group.color});

  const openGroupDeleteDialog = (): void => {
    showGroupDeleteDialog(group);
  };

  const menuItems = [
    {
      action: goToItemCreate,
      icon: <PlusIcon size="sm" color="primary.500" />,
      text: t('group:menu.createItem'),
      show: canEdit,
    },
    {
      action: goToGroupView,
      icon: <EyeIcon size="sm" color="primary.500" />,
      text: t('group:menu.viewGroup'),
    },
    {
      action: goToGroupEdit,
      icon: <EditIcon size="sm" color="primary.500" />,
      text: t('group:menu.editGroup'),
      show: canAdmin,
    },
    {
      action: openGroupDeleteDialog,
      icon: <DeleteIcon size="sm" color="error.500" />,
      text: t('group:menu.deleteGroup'),
      show: canAdmin,
    },
  ] as MenuItemProps[];

  return (
    <Menu
      trigger={(triggerProps) => (
        <RoundButton
          {...triggerProps}
          borderColor="white"
          _pressed={{bg: 'white:alpha.20'}}
          leftIcon={<DotsVerticalIcon color="white" size="sm" />}
        />
      )}
    >
      {menuItems.map((itemProps, index) => (
        <MenuItem {...itemProps} key={index} />
      ))}
    </Menu>
  );
};

export default GroupListCardMenuButton;
