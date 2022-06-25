import React, {Dispatch, MutableRefObject, ReactElement, SetStateAction, useCallback, useRef, useState} from 'react';
import {useTheme} from 'native-base';
import {IFlatListProps} from 'native-base/lib/typescript/components/basic/FlatList';
import {ListUtils} from '../../shared/utils/ListUtils';
import {
  FlatList as RNFlatList,
  LayoutChangeEvent,
  ListRenderItemInfo,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  RefreshControl,
} from 'react-native';
import {ChatItem} from '../../models/ChatItem';

export type FlatListType = RNFlatList;

type FlatListProps<T> = Partial<IFlatListProps<T>> & {
  render: (item: T, onLayout: (event: LayoutChangeEvent) => void) => ReactElement;
  keyExtractor: (item: T) => string;
  refresh?: () => Promise<void>;
  setIsOnTheTop?: Dispatch<SetStateAction<boolean>>;
  listRef?: MutableRefObject<RNFlatList>;
};

const FlatList = ({data, render, keyExtractor, refresh, setIsOnTheTop, listRef, ...props}: FlatListProps<any>) => {
  const theme = useTheme();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const heights = useRef<Map<string, number>>(new Map());

  const getItemHeight = useCallback(
    (index: number): number => {
      const item = data[index];
      const key = keyExtractor(item);
      return heights.current.get(key) || 0;
    },
    [data, keyExtractor],
  );

  const _onLayout = useCallback((key: string, event: LayoutChangeEvent): void => {
    const height = event.nativeEvent.layout.height;
    heights.current.set(key, height);
  }, []);

  const _renderItem = useCallback(
    (info: ListRenderItemInfo<any>): ReactElement => {
      const key = keyExtractor(info.item);
      const onLayout = (event: LayoutChangeEvent): void => _onLayout(key, event);
      return render(info.item, onLayout);
    },
    [render, keyExtractor],
  );

  const _getItemLayout = useCallback(
    (data: ChatItem[], index: number) => {
      const length = getItemHeight(index);
      const offset = Array.from(Array(index).keys())
        .map((i) => getItemHeight(i))
        .reduce((a, c) => a + c, 0);
      return {length, offset, index};
    },
    [getItemHeight],
  );

  const onScrollEnd = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>): void => {
    if (setIsOnTheTop) {
      setIsOnTheTop(event.nativeEvent.contentOffset.y <= 0);
    }
  }, []);

  const _onRefresh = (): void => {
    setRefreshing(true);
    refresh().finally(() => setRefreshing(false));
  };

  const _refreshControl = (
    <RefreshControl colors={[theme.colors.primary['500']]} refreshing={refreshing} onRefresh={_onRefresh} />
  );

  return (
    <RNFlatList
      data={data}
      renderItem={_renderItem}
      getItemLayout={_getItemLayout}
      keyExtractor={keyExtractor}
      refreshControl={refresh ? _refreshControl : null}
      onScrollEndDrag={onScrollEnd}
      onMomentumScrollEnd={onScrollEnd}
      showsVerticalScrollIndicator={false}
      removeClippedSubviews={Platform.OS === 'android'}
      contentContainerStyle={ListUtils.containerStyle(theme)}
      ref={listRef}
      {...props}
      initialNumToRender={props.initialNumToRender || 15}
      maxToRenderPerBatch={props.maxToRenderPerBatch || 15}
      onEndReachedThreshold={props.onEndReachedThreshold || 10}
      windowSize={props.windowSize || 15}
    />
  );
};

export default FlatList;
