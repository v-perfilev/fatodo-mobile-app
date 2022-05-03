import React from 'react';
import Menu, {MenuItem, MenuItemProps} from '../../../../components/controls/Menu';
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
import {Group} from '../../../../models/Group';
import {ReduxAuthState} from '../../../../store/rerducers/AuthReducer';

type GroupListCardMenuButtonProps = ReduxAuthState & {
  group: Group;
};

const GroupListCardMenuButton = ({group, account}: GroupListCardMenuButtonProps) => {
  const {t} = useTranslation();
  const navigation = useNavigation<GroupNavigationProp>();
  // const {load: loadGroups} = useGroupListContext();
  // const {showGroupDeleteDialog} = useGroupDialogContext();

  const canEdit = group && GroupUtils.canEdit(account, group);
  const canAdmin = group && GroupUtils.canAdmin(account, group);

  const goToGroupView = (): void => {
    navigation.navigate('GroupView', {groupId: group.id});
  };

  const goToItemCreate = (): void => {
    navigation.navigate('ItemCreate', {groupId: group.id});
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

export default flowRight([withAuthState])(GroupListCardMenuButton);
