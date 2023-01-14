import React, {useState} from 'react';
import DeleteIcon from '../../../components/icons/DeleteIcon';
import EditIcon from '../../../components/icons/EditIcon';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {GroupNavigationProps} from '../../../navigators/GroupNavigator';
import {GroupUtils} from '../../../shared/utils/GroupUtils';
import {UserAccount} from '../../../models/User';
import {useItemDialogContext} from '../../../shared/contexts/dialogContexts/ItemDialogContext';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import ItemSelectors from '../../../store/item/itemSelectors';
import Header from '../../../components/layouts/Header';
import Menu, {MenuItemProps, MenuTrigger} from '../../../components/controls/Menu';
import PackageUpIcon from '../../../components/icons/PackageUpIcon';
import PackageDownIcon from '../../../components/icons/PackageDownIcon';
import {ItemActions} from '../../../store/item/itemActions';

type ItemViewMenuProps = {
  account: UserAccount;
};

const ItemViewHeader = ({account}: ItemViewMenuProps) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<GroupNavigationProps>();
  const {t} = useTranslation();
  const {showItemDeleteDialog} = useItemDialogContext();
  const group = useAppSelector(ItemSelectors.group);
  const item = useAppSelector(ItemSelectors.item);
  const [archivedLoading, setArchivedLoading] = useState<boolean>(false);

  const goToGroupView = (): void => navigation.navigate('GroupView', {group});
  const goToItemEdit = (): void => navigation.navigate('ItemEdit', {group, item});

  const toggleArchived = (): void => {
    setArchivedLoading(true);
    dispatch(ItemActions.updateItemArchivedThunk(item))
      .unwrap()
      .finally(() => setArchivedLoading(false));
  };

  const openItemDeleteDialog = (): void => {
    const onSuccess = (): void => goToGroupView();
    showItemDeleteDialog(item, onSuccess);
  };

  const canEdit = group && GroupUtils.canAdmin(account, group);

  const menuItems: MenuItemProps[] = [
    {
      action: toggleArchived,
      icon: item?.archived ? (
        <PackageUpIcon color={`${group?.color}.500`} />
      ) : (
        <PackageDownIcon color={`${group?.color}.500`} />
      ),
      text: item?.archived ? t('group:actions.removeFromArchive') : t('group:actions.moveToArchive'),
      loading: archivedLoading,
      disabled: archivedLoading,
      hidden: !canEdit,
    },
    {icon: <EditIcon color="primary.500" />, action: goToItemEdit, text: t('item:actions.edit'), hidden: !canEdit},
    {
      icon: <DeleteIcon color="error.500" />,
      action: openItemDeleteDialog,
      text: t('item:actions.delete'),
      hidden: !canEdit,
    },
  ];

  return (
    <Header title={item?.title}>
      <Menu trigger={MenuTrigger()} menuItems={menuItems} />
    </Header>
  );
};

export default ItemViewHeader;
