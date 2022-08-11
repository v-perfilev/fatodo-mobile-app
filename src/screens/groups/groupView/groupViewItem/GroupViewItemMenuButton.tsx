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
import {useItemDialogContext} from '../../../../shared/contexts/dialogContexts/ItemDialogContext';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import GroupSelectors from '../../../../store/group/groupSelectors';
import IconButton from '../../../../components/controls/IconButton';
import {GroupThunks} from '../../../../store/group/groupActions';

type GroupViewItemMenuProps = {
  item: Item;
  canEdit: boolean;
};

const GroupViewItemMenuButton = ({item, canEdit}: GroupViewItemMenuProps) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<GroupNavigationProp>();
  const {t} = useTranslation();
  const {showItemDeleteDialog} = useItemDialogContext();
  const group = useAppSelector(GroupSelectors.group);
  const [archivedLoading, setArchivedLoading] = useState<boolean>(false);

  const goToItemView = (): void => navigation.navigate('ItemView', {group, item});
  const goToItemEdit = (): void => navigation.navigate('ItemEdit', {group, item});

  const deleteItem = (item: Item): void => {
    dispatch(GroupThunks.deleteItem(item));
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

  const menuItems: MenuItemProps[] = [
    {action: goToItemView, icon: <EyeIcon color="primary.500" />, text: t('group:actions.view')},
    {
      action: toggleArchived,
      icon: item.archived ? <PackageUpIcon color="primary.500" /> : <PackageDownIcon color="primary.500" />,
      text: item.archived ? t('group:actions.removeFromArchive') : t('group:actions.moveToArchive'),
      loading: archivedLoading,
      disabled: archivedLoading,
      hidden: !canEdit,
    },
    {action: goToItemEdit, icon: <EditIcon color="primary.500" />, text: t('group:actions.edit')},
    {action: openItemDeleteDialog, icon: <DeleteIcon color="error.500" />, text: t('group:actions.delete')},
  ];

  return (
    <Menu
      trigger={(triggerProps) => (
        <IconButton p="1.5" bgTransparency="5" icon={<DotsVerticalIcon />} {...triggerProps} />
      )}
    >
      {menuItems.map((itemProps, index) => (
        <MenuItem {...itemProps} key={index} />
      ))}
    </Menu>
  );
};

export default GroupViewItemMenuButton;
