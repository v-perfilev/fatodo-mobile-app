import React from 'react';
import {MenuElement} from '../../../models/MenuElement';
import DeleteIcon from '../../../components/icons/DeleteIcon';
import EditIcon from '../../../components/icons/EditIcon';
import {useTranslation} from 'react-i18next';
import ControlMenu from '../../../components/layouts/ControlMenu';
import {useNavigation} from '@react-navigation/native';
import {GroupNavigationProp} from '../../../navigators/GroupNavigator';
import {useGroupViewContext} from '../../../shared/contexts/viewContexts/groupViewContext';
import {GroupUtils} from '../../../shared/utils/GroupUtils';
import {UserAccount} from '../../../models/User';
import {Box} from 'native-base';
import ItemsIcon from '../../../components/icons/ItemsIcon';
import {useItemDialogContext} from '../../../shared/contexts/dialogContexts/ItemDialogContext';
import {useItemViewContext} from '../../../shared/contexts/viewContexts/itemViewContext';

type ItemViewMenuProps = {
  account: UserAccount;
};

const ItemViewMenu = ({account}: ItemViewMenuProps) => {
  const navigation = useNavigation<GroupNavigationProp>();
  const {t} = useTranslation();
  const {item} = useItemViewContext();
  const {group} = useGroupViewContext();
  const {showItemDeleteDialog} = useItemDialogContext();

  const goToGroupView = (): void => {
    navigation.navigate('GroupView', {groupId: group.id});
  };

  const goToItemEdit = (): void => {
    navigation.navigate('ItemEdit', {itemId: item.id});
  };

  const openItemDeleteDialog = (): void => {
    const onSuccess = (): void => goToGroupView();
    showItemDeleteDialog(item, onSuccess);
  };

  const canEdit = group && GroupUtils.canAdmin(account, group);

  const menuElements = [
    {icon: <ItemsIcon />, action: goToGroupView, text: t('item:tooltips.list')},
    {icon: <EditIcon />, action: goToItemEdit, text: t('item:tooltips.edit'), disabled: !canEdit},
    {
      icon: <DeleteIcon />,
      action: openItemDeleteDialog,
      text: t('item:tooltips.delete'),
      color: 'secondary',
      disabled: !canEdit,
    },
  ] as MenuElement[];

  return (
    <Box my="1">
      <ControlMenu menu={menuElements} />
    </Box>
  );
};

export default ItemViewMenu;
