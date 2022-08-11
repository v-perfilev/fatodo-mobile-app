import React, {ReactElement, useCallback, useEffect, useMemo} from 'react';
import {Box, useTheme} from 'native-base';
import {LayoutChangeEvent} from 'react-native';
import {useAppSelector} from '../../../../store/store';
import GroupSelectors from '../../../../store/group/groupSelectors';
import GroupViewItem from '../groupViewItem/GroupViewItem';
import {Item} from '../../../../models/Item';
import {GroupUtils} from '../../../../shared/utils/GroupUtils';
import AuthSelectors from '../../../../store/auth/authSelectors';
import GroupViewStub from './GroupViewStub';
import {ListUtils} from '../../../../shared/utils/ListUtils';
import FlatList from '../../../../components/surfaces/FlatList';

type GroupViewItemsProps = {
  items: Item[];
  load: () => Promise<void>;
  refresh: () => Promise<void>;
  header?: ReactElement;
};

const GroupViewItems = ({items, load, refresh, header}: GroupViewItemsProps) => {
  const theme = useTheme();
  const account = useAppSelector(AuthSelectors.account);
  const group = useAppSelector(GroupSelectors.group);

  const canEdit = useMemo<boolean>(() => group && GroupUtils.canEdit(account, group), [group, account]);

  /*
  stub, keyExtractor and renderItem
   */

  const keyExtractor = useCallback((item: Item): string => item.id, []);
  const renderItem = useCallback(
    (item: Item, onLayout: (event: LayoutChangeEvent) => void): ReactElement => (
      <Box onLayout={onLayout} style={ListUtils.themedItemStyle(theme)}>
        <GroupViewItem item={item} canEdit={canEdit} />
      </Box>
    ),
    [],
  );

  useEffect(() => {
    if (items.length === 0) {
      refresh().finally();
    }
  }, []);

  return (
    <FlatList
      ListHeaderComponent={header}
      ListEmptyComponent={<GroupViewStub />}
      data={items}
      render={renderItem}
      keyExtractor={keyExtractor}
      onEndReached={load}
      refresh={refresh}
    />
  );
};

export default GroupViewItems;
