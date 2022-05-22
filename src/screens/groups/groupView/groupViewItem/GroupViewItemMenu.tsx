import React, {useCallback, useState} from 'react';
import {Item} from '../../../../models/Item';
import EyeIcon from '../../../../components/icons/EyeIcon';
import {useNavigation} from '@react-navigation/native';
import {GroupNavigationProp} from '../../../../navigators/GroupNavigator';
import Menu, {MenuItem, MenuItemProps} from '../../../../components/controls/Menu';
import DotsVerticalIcon from '../../../../components/icons/DotsVerticalIcon';
import EditIcon from '../../../../components/icons/EditIcon';
import DeleteIcon from '../../../../components/icons/DeleteIcon';
import {useTranslation} from 'react-i18next';
import PackageUpIcon from '../../../../components/icons/PackageUpIcon';
import PackageDownIcon from '../../../../components/icons/PackageDownIcon';
import PressableButton from '../../../../components/controls/PressableButton';
import {useItemDialogContext} from '../../../../shared/contexts/dialogContexts/ItemDialogContext';
import {useAppDispatch} from '../../../../store/store';
import GroupThunks from '../../../../store/group/groupThunks';

type GroupViewItemMenuProps = {
  item: Item;
  canEdit: boolean;
};

const GroupViewItemMenu = ({item, canEdit}: GroupViewItemMenuProps) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<GroupNavigationProp>();
  const {t} = useTranslation();
  const {showItemDeleteDialog} = useItemDialogContext();
  const [archivedLoading, setArchivedLoading] = useState<boolean>(false);

  const deleteItem = (item: Item): void => {
    dispatch(GroupThunks.deleteItem(item));
  };

  const goToItemView = (): void => {
    navigation.navigate('ItemView', {itemId: item.id});
  };

  const goToItemEdit = (): void => {
    navigation.navigate('ItemEdit', {itemId: item.id});
  };

  const toggleArchived = useCallback((): void => {
    setArchivedLoading(true);
    dispatch(GroupThunks.updateItemArchived(item))
      .unwrap()
      .catch(() => setArchivedLoading(false));
  }, [item, setArchivedLoading]);

  const openItemDeleteDialog = (): void => {
    const onSuccess = (): void => deleteItem(item);
    showItemDeleteDialog(item, onSuccess);
  };

  const menuItems = [
    {action: goToItemView, icon: <EyeIcon color="primary.500" size="sm" />, text: t('group:actions.view')},
    {
      action: toggleArchived,
      icon: item.archived ? (
        <PackageUpIcon color="primary.500" size="sm" />
      ) : (
        <PackageDownIcon color="primary.500" size="sm" />
      ),
      text: item.archived ? t('group:actions.removeFromArchive') : t('group:actions.moveToArchive'),
      loading: archivedLoading,
      disabled: archivedLoading,
      show: canEdit,
    },
    {action: goToItemEdit, icon: <EditIcon color="primary.500" size="sm" />, text: t('group:actions.edit')},
    {action: openItemDeleteDialog, icon: <DeleteIcon color="error.500" size="sm" />, text: t('group:actions.delete')},
  ] as MenuItemProps[];

  return (
    <Menu
      trigger={(triggerProps) => (
        <PressableButton {...triggerProps}>
          <DotsVerticalIcon color="primary.500" size="6" />
        </PressableButton>
      )}
    >
      {menuItems.map((itemProps, index) => (
        <MenuItem {...itemProps} key={index} />
      ))}
    </Menu>
  );
};

export default GroupViewItemMenu;
