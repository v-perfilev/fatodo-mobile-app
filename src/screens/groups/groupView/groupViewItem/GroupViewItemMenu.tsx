import React, {useCallback, useState} from 'react';
import {Item} from '../../../../models/Item';
import EyeIcon from '../../../../components/icons/EyeIcon';
import {useNavigation} from '@react-navigation/native';
import {GroupNavigationProp} from '../../../../navigators/GroupNavigator';
import {HStack} from 'native-base';
import Menu, {MenuItem, MenuItemProps} from '../../../../components/controls/Menu';
import DotsVerticalIcon from '../../../../components/icons/DotsVerticalIcon';
import EditIcon from '../../../../components/icons/EditIcon';
import DeleteIcon from '../../../../components/icons/DeleteIcon';
import {useTranslation} from 'react-i18next';
import {useArchivedItemListContext} from '../../../../shared/contexts/listContexts/archivedItemListContext';
import {useItemListContext} from '../../../../shared/contexts/listContexts/itemListContext';
import ItemService from '../../../../services/ItemService';
import {useSnackContext} from '../../../../shared/contexts/SnackContext';
import PackageUpIcon from '../../../../components/icons/PackageUpIcon';
import PackageDownIcon from '../../../../components/icons/PackageDownIcon';
import PressableButton from '../../../../components/controls/PressableButton';

type GroupViewItemMenuProps = {
  item: Item;
  canEdit: boolean;
};

const GroupViewItemMenu = ({item, canEdit}: GroupViewItemMenuProps) => {
  const navigation = useNavigation<GroupNavigationProp>();
  const {t} = useTranslation();
  const {handleResponse} = useSnackContext();
  const {addItem: addActive, removeItem: removedActive} = useItemListContext();
  const {addItem: addArchived, removeItem: removeArchived} = useArchivedItemListContext();
  const [archivedLoading, setArchivedLoading] = useState<boolean>(false);

  const goToItemView = (): void => {
    navigation.navigate('ItemView', {itemId: item.id});
  };

  const goToItemEdit = (): void => {
    navigation.navigate('ItemEdit', {itemId: item.id});
  };

  const toggleArchived = useCallback((): void => {
    setArchivedLoading(true);
    ItemService.updateItemArchived(item.id, !item.archived)
      .then(() => {
        const updatedItem = {...item, archived: !item.archived};
        const removeFromPreviousList = item.archived ? removeArchived : removedActive;
        const addToNextList = item.archived ? addActive : addArchived;
        removeFromPreviousList(item.id);
        addToNextList(updatedItem);
      })
      .catch(({response}) => {
        handleResponse(response);
        setArchivedLoading(false);
      });
  }, [item, setArchivedLoading, removeArchived, removedActive, addArchived, addActive, handleResponse]);

  const openItemDeleteDialog = (): void => {
    // const onSuccess = (): void => loadGroups();
    // showGroupDeleteDialog(group, onSuccess);
    console.log('deleteItem');
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
    <HStack ml="1" alignItems="center">
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
    </HStack>
  );
};

export default GroupViewItemMenu;
