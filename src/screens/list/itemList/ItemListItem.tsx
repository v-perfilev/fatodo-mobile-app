import React, {useMemo} from 'react';
import ItemView from '../../components/item/ItemView';
import {LayoutChangeEvent} from 'react-native';
import {Group} from '../../../models/Group';
import {Box} from 'native-base';
import {useAppSelector} from '../../../store/store';
import AuthSelectors from '../../../store/auth/authSelectors';
import {GroupUtils} from '../../../shared/utils/GroupUtils';
import ListSelectors from '../../../store/list/listSelectors';
import {Item} from '../../../models/Item';
import ItemListItemSkeleton from '../skeletons/ItemListItemSkeleton';

type ItemListItemProps = {
  item: Item;
  onLayout: (event: LayoutChangeEvent) => void;
};

const ItemListItem = ({item, onLayout}: ItemListItemProps) => {
  const groups = useAppSelector(ListSelectors.groups);
  const account = useAppSelector(AuthSelectors.account);

  const group = useMemo<Group>(() => {
    return groups.find((g) => g.id === item.groupId);
  }, [groups]);

  const canEdit = useMemo<boolean>(() => {
    return group && GroupUtils.canEdit(account, group);
  }, [group, account]);

  return (
    <Box onLayout={onLayout}>
      {group && <ItemView item={item} group={group} canEdit={canEdit} showGroup />}
      {!group && <ItemListItemSkeleton />}
    </Box>
  );
};

export default ItemListItem;
