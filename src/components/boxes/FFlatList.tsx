import React, {Dispatch, MutableRefObject, ReactElement, SetStateAction, useCallback, useRef} from 'react';
import {useTheme} from 'native-base';
import {IFlatListProps} from 'native-base/lib/typescript/components/basic/FlatList';
import {ListUtils} from '../../shared/utils/ListUtils';
import {
  FlatList,
  LayoutChangeEvent,
  ListRenderItemInfo,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
} from 'react-native';
import {ChatItem} from '../../models/ChatItem';

type FFlatListProps<T> = Partial<IFlatListProps<T>> & {
  renderItemWithLayout: (item: T, onLayout: (event: LayoutChangeEvent) => void) => ReactElement;
  keyExtractor: (item: T) => string;
  setIsOnTheTop?: Dispatch<SetStateAction<boolean>>;
  listRef?: MutableRefObject<FlatList>;
};

const FFlatList = ({
  data,
  renderItemWithLayout,
  keyExtractor,
  setIsOnTheTop,
  listRef,
  ...props
}: FFlatListProps<any>) => {
  const theme = useTheme();
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
      return renderItemWithLayout(info.item, onLayout);
    },
    [renderItemWithLayout, keyExtractor],
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

  return (
    <FlatList
      data={data}
      renderItem={_renderItem}
      getItemLayout={_getItemLayout}
      keyExtractor={keyExtractor}
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

export default FFlatList;
