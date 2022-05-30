import React from 'react';
import DeleteIcon from '../../../components/icons/DeleteIcon';
import EditIcon from '../../../components/icons/EditIcon';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {GroupNavigationProp} from '../../../navigators/GroupNavigator';
import {GroupUtils} from '../../../shared/utils/GroupUtils';
import {UserAccount} from '../../../models/User';
import {useItemDialogContext} from '../../../shared/contexts/dialogContexts/ItemDialogContext';
import {useAppSelector} from '../../../store/store';
import ItemSelectors from '../../../store/item/itemSelectors';
import GroupSelectors from '../../../store/group/groupSelectors';
import Header from '../../../components/layouts/Header';
import Menu, {MenuItem, MenuItemProps} from '../../../components/controls/Menu';
import IconButton from '../../../components/controls/IconButton';
import DotsVerticalIcon from '../../../components/icons/DotsVerticalIcon';

type ItemViewMenuProps = {
  account: UserAccount;
};

const ItemViewHeader = ({account}: ItemViewMenuProps) => {
  const navigation = useNavigation<GroupNavigationProp>();
  const {t} = useTranslation();
  const {showItemDeleteDialog} = useItemDialogContext();
  const group = useAppSelector(GroupSelectors.group);
  const item = useAppSelector(ItemSelectors.item);

  const goToGroupView = (): void => navigation.navigate('GroupView', {group});
  const goToItemEdit = (): void => navigation.navigate('ItemEdit', {group, item});

  const openItemDeleteDialog = (): void => {
    const onSuccess = (): void => goToGroupView();
    showItemDeleteDialog(item, onSuccess);
  };

  const canEdit = group && GroupUtils.canAdmin(account, group);

  const menuElements = [
    {icon: <EditIcon color="primary.500" />, action: goToItemEdit, text: t('item:actions.edit'), disabled: !canEdit},
    {
      icon: <DeleteIcon color="error.500" />,
      action: openItemDeleteDialog,
      text: t('item:actions.delete'),
      disabled: !canEdit,
    },
  ] as MenuItemProps[];

  return (
    <Header title={item?.title} hideLogo>
      <Menu
        trigger={(triggerProps) => (
          <IconButton {...triggerProps} colorScheme="white" size="lg" p="1.5" icon={<DotsVerticalIcon />} />
        )}
      >
        {menuElements.map((itemProps, index) => (
          <MenuItem {...itemProps} key={index} />
        ))}
      </Menu>
    </Header>
  );
};

export default ItemViewHeader;
