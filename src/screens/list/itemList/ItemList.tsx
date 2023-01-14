import React, {memo, ReactElement, useCallback, useEffect, useMemo, useRef} from 'react';
import ItemListHeader from './ItemListHeader';
import {HEADER_HEIGHT} from '../../../constants';
import {FlatListType} from '../../../components/scrollable/FlatList';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {Item} from '../../../models/Item';
import {LayoutChangeEvent, ListRenderItemInfo, StyleProp, ViewStyle} from 'react-native';
import CollapsableRefreshableFlatList, {
  CollapsableRefreshableFlatListChildrenProps,
} from '../../../components/scrollable/CollapsableRefreshableFlatList';
import {CornerButton} from '../../../models/CornerButton';
import ArrowUpIcon from '../../../components/icons/ArrowUpIcon';
import CornerManagement from '../../../components/controls/CornerManagement';
import {useIsFocused} from '@react-navigation/native';
import PlusIcon from '../../../components/icons/PlusIcon';
import CentredLoader from '../../../components/surfaces/CentredLoader';
import Separator from '../../../components/layouts/Separator';
import {flowRight} from 'lodash';
import ListSelectors from '../../../store/list/listSelectors';
import {ListActions} from '../../../store/list/listActions';
import ItemListItem from './ItemListItem';
import ItemListSkeleton from '../skeletons/ItemListSkeleton';
import ItemListStub from './ItemListStub';

const paddingTop = HEADER_HEIGHT;
const containerStyle: StyleProp<ViewStyle> = {paddingTop};
const loaderStyle: StyleProp<ViewStyle> = {paddingTop};

const ItemList = () => {
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();
  const items = useAppSelector(ListSelectors.items);
  const allItemsLoaded = useAppSelector(ListSelectors.allItemsLoaded);
  const shouldLoad = useAppSelector(ListSelectors.shouldLoad);

  const listRef = useRef<FlatListType>();

  /*
  loaders
   */

  const initialLoad = useCallback(async (): Promise<void> => {
    dispatch(ListActions.fetchGroupsThunk());
    await dispatch(ListActions.fetchInitialItemsThunk());
  }, []);

  const load = useCallback(async (): Promise<void> => {
    const offset = items.length;
    await dispatch(ListActions.fetchItemsThunk({offset}));
  }, [items]);

  const refresh = useCallback(async (): Promise<void> => {
    await dispatch(ListActions.refreshItemsThunk());
  }, []);

  /*
  stub, keyExtractor and renderItem
   */

  const keyExtractor = useCallback((item: Item): string => item.id, []);
  const renderItem = useCallback(
    (info: ListRenderItemInfo<Item>, onLayout: (event: LayoutChangeEvent) => void): ReactElement => (
      <ItemListItem item={info.item} onLayout={onLayout} />
    ),
    [],
  );

  /*
  scroll up button
   */

  const scrollUp = (): void => listRef.current.scrollToOffset({offset: 0});

  /*
  Effects
   */

  useEffect(() => {
    if (items.length === 0 && !allItemsLoaded) {
      initialLoad().finally();
    }
  }, []);

  useEffect(() => {
    if (isFocused && shouldLoad) {
      dispatch(ListActions.resetItems());
      dispatch(ListActions.fetchInitialItemsThunk());
    }
  }, [shouldLoad, isFocused]);

  const buttons = useMemo<CornerButton[]>(
    () => [
      {icon: <PlusIcon />, action: console.log},
      {icon: <ArrowUpIcon />, action: scrollUp, color: 'trueGray', hideOnTop: true, additionalColumn: true},
    ],
    [],
  );

  const cornerManagement = useCallback(
    ({scrollY}: CollapsableRefreshableFlatListChildrenProps) => (
      <CornerManagement buttons={buttons} scrollY={scrollY} />
    ),
    [buttons],
  );

  return (
    <CollapsableRefreshableFlatList
      contentContainerStyle={containerStyle}
      loaderStyle={loaderStyle}
      header={<ItemListHeader />}
      loading={items.length === 0 && !allItemsLoaded}
      loadingPlaceholder={<ItemListSkeleton />}
      ListEmptyComponent={<ItemListStub />}
      ListFooterComponent={items.length > 0 && !allItemsLoaded ? <CentredLoader my="5" /> : undefined}
      ItemSeparatorComponent={Separator}
      data={items}
      render={renderItem}
      keyExtractor={keyExtractor}
      onEndReached={!allItemsLoaded ? load : undefined}
      refresh={refresh}
      ref={listRef}
    >
      {cornerManagement}
    </CollapsableRefreshableFlatList>
  );
};

export default flowRight([memo])(ItemList);
