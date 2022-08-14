import React, {Dispatch, ReactElement, SetStateAction, useCallback, useEffect, useMemo, useRef, useState} from 'react';
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
import FlatList, {FlatListType} from '../../../../components/surfaces/FlatList';
import CollapsableHeaderContainer, {
  CollapsableHeaderChildrenProps,
} from '../../../../components/layouts/CollapsableHeaderContainer';
import ConditionalSpinner from '../../../../components/surfaces/ConditionalSpinner';
import {HEADER_HEIGHT} from '../../../../constants';
import GroupViewHeader from '../GroupViewHeader';
import GroupViewCorner from '../GroupViewCorner';
import ScrollCornerButton from '../../../../components/controls/ScrollCornerButton';

type GroupViewItemsProps = {
  items: Item[];
  load: () => Promise<void>;
  refresh: () => Promise<void>;
  loading: boolean;
  showArchived: boolean;
  setShowArchived: Dispatch<SetStateAction<boolean>>;
};

const GroupViewItems = ({items, load, refresh, loading, showArchived, setShowArchived}: GroupViewItemsProps) => {
  const theme = useTheme();
  const account = useAppSelector(AuthSelectors.account);
  const group = useAppSelector(GroupSelectors.group);
  const [hideScroll, setHideScroll] = useState<boolean>(true);
  const listRef = useRef<FlatListType>();

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

  /*
  scroll down button
   */

  const scrollUp = useCallback((): void => {
    setHideScroll(true);
    listRef.current.scrollToOffset({offset: 0});
  }, [listRef.current]);

  /*
  Effects
   */

  useEffect(() => {
    if (items.length === 0) {
      refresh().finally();
    }
  }, []);

  return (
    <CollapsableHeaderContainer
      header={<GroupViewHeader showArchived={showArchived} setShowArchived={setShowArchived} />}
    >
      {({handleEventScroll, handleEventSnap, flatListRef}: CollapsableHeaderChildrenProps) => (
        <ConditionalSpinner loading={loading} paddingTop={HEADER_HEIGHT}>
          <FlatList
            contentContainerStyle={ListUtils.containerStyle(HEADER_HEIGHT)}
            ListEmptyComponent={<GroupViewStub />}
            data={items}
            render={renderItem}
            keyExtractor={keyExtractor}
            onScroll={handleEventScroll}
            onMomentumScrollEnd={handleEventSnap}
            onEndReached={load}
            refresh={refresh}
            setIsOnTheTop={setHideScroll}
            listRefs={[listRef, flatListRef]}
          />
          <GroupViewCorner />
          <ScrollCornerButton show={!hideScroll} scrollDown={scrollUp} />
        </ConditionalSpinner>
      )}
    </CollapsableHeaderContainer>
  );
};

export default GroupViewItems;
