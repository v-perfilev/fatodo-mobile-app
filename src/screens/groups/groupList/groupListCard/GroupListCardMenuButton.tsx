import React, {FC} from 'react';
import {useGroupViewContext} from '../../../../shared/contexts/viewContexts/groupViewContext';
import Menu, {MenuItem, MenuItemProps} from '../../../../components/controls/Menu';
import {UserAccount} from '../../../../models/User';
import {GroupUtils} from '../../../../shared/utils/GroupUtils';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {GroupNavigationProp} from '../../../../navigators/GroupNavigator';
import {flowRight} from 'lodash';
import withAuthState from '../../../../shared/hocs/withAuthState';
import PlusIcon from '../../../../components/icons/PlusIcon';
import EyeIcon from '../../../../components/icons/EyeIcon';
import EditIcon from '../../../../components/icons/EditIcon';
import DeleteIcon from '../../../../components/icons/DeleteIcon';
import DotsVerticalIcon from '../../../../components/icons/DotsVerticalIcon';
import RoundButton from '../../../../components/controls/RoundButton';

type GroupListCardMenuButtonProps = {
  account: UserAccount;
};

const GroupListCardMenuButton: FC<GroupListCardMenuButtonProps> = ({account}) => {
  const {t} = useTranslation();
  const navigation = useNavigation<GroupNavigationProp>();
  const {group} = useGroupViewContext();
  // const {load: loadGroups} = useGroupListContext();
  // const {showGroupDeleteDialog} = useGroupDialogContext();

  const canEdit = group && GroupUtils.canEdit(account, group);
  const canAdmin = group && GroupUtils.canAdmin(account, group);

  const goToItemCreate = (): void => {
    navigation.navigate('ItemCreate', {groupId: group.id});
  };

  const goToGroupView = (): void => {
    navigation.navigate('GroupView', {groupId: group.id});
  };

  const goToGroupEdit = (): void => {
    navigation.navigate('GroupEdit', {groupId: group.id});
  };

  const openGroupDeleteDialog = (): void => {
    // const onSuccess = (): void => loadGroups();
    // showGroupDeleteDialog(group, onSuccess);
    console.log('deleteGroup');
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
        <RoundButton {...triggerProps}>
          <DotsVerticalIcon size="6" color="white" />
        </RoundButton>
      )}
    >
      {menuItems.map((itemProps, index) => (
        <MenuItem {...itemProps} key={index} />
      ))}
    </Menu>
  );
};

export default flowRight([withAuthState])(GroupListCardMenuButton);
