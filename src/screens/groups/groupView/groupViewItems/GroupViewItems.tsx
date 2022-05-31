import React, {ReactElement, useCallback, useEffect, useMemo} from 'react';
import {FlatList, useTheme} from 'native-base';
import {ListRenderItemInfo} from 'react-native';
import {useAppSelector} from '../../../../store/store';
import GroupSelectors from '../../../../store/group/groupSelectors';
import GroupViewItem from '../groupViewItem/GroupViewItem';
import {Item} from '../../../../models/Item';
import {GroupUtils} from '../../../../shared/utils/GroupUtils';
import AuthSelectors from '../../../../store/auth/authSelectors';
import GroupViewItemsSkeleton from '../skeletons/GroupViewItemsSkeleton';
import {useDelayedState} from '../../../../shared/hooks/useDelayedState';
import GroupViewStub from './GroupViewStub';
import {ListUtils} from '../../../../shared/utils/ListUtils';

type GroupViewItemsProps = {
  items: Item[];
  loadMorePromise?: () => Promise<any>;
  header?: ReactElement;
};

const GroupViewItems = ({items, loadMorePromise, header}: GroupViewItemsProps) => {
  const theme = useTheme();
  const [loading, setLoading] = useDelayedState(items.length === 0);
  const account = useAppSelector(AuthSelectors.account);
  const group = useAppSelector(GroupSelectors.group);

  const canEdit = useMemo<boolean>(() => group && GroupUtils.canEdit(account, group), [group, account]);

  const loadMore = (): void => {
    loadMorePromise().then(() => setLoading(false));
  };

  const stub = loading ? <GroupViewItemsSkeleton /> : <GroupViewStub />;
  const keyExtractor = useCallback((item: Item): string => item.id, []);
  const renderItem = useCallback((info: ListRenderItemInfo<Item>): ReactElement => {
    return <GroupViewItem item={info.item} canEdit={canEdit} style={ListUtils.itemStyle(theme)} />;
  }, []);

  useEffect(() => {
    if (items.length === 0) {
      loadMore();
    }
  }, []);

  return (
    <FlatList
      ListHeaderComponent={header}
      ListEmptyComponent={stub}
      data={items}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      onEndReached={loadMore}
      onEndReachedThreshold={5}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={ListUtils.containerStyle(theme)}
    />
  );
};

export default GroupViewItems;
