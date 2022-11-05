import React, {ForwardedRef, memo, ReactElement, useCallback, useRef} from 'react';
import {IFlatListProps} from 'native-base/lib/typescript/components/basic/FlatList';
import {Animated, FlatList as RNFlatList, LayoutChangeEvent, ListRenderItemInfo, Platform} from 'react-native';
import {DEFAULT_FLAT_LIST_ITEM_HEIGHT} from '../../constants';

export type FlatListType = RNFlatList;

export type FlatListProps<T> = Partial<IFlatListProps<T>> & {
  render: (info: ListRenderItemInfo<T>, onLayout?: (event: LayoutChangeEvent) => void) => ReactElement;
  keyExtractor?: (item: T) => string;
  fixedLength?: number;
};

const FlatList = React.forwardRef((props: FlatListProps<any>, ref: ForwardedRef<any>) => {
  const {data, render, keyExtractor, fixedLength} = props;
  const lengthMap = useRef<Map<string, number>>(new Map());

  const getItemLength = useCallback(
    (index: number): number => {
      if (index < 0) {
        return 0;
      }
      if (fixedLength) {
        return fixedLength;
      } else {
        const item = data[index];
        const key = keyExtractor(item);
        return lengthMap.current.get(key) || DEFAULT_FLAT_LIST_ITEM_HEIGHT;
      }
    },
    [data],
  );

  const getItemOffset = useCallback(
    (index: number): number => {
      if (index < 0) {
        return 0;
      }
      if (fixedLength) {
        return index * fixedLength;
      } else {
        return Array.from(Array(index).keys())
          .map((i) => getItemLength(i))
          .reduce((a, c) => a + c, 0);
      }
    },
    [getItemLength],
  );

  const _onLayout = useCallback((key: string, event: LayoutChangeEvent): void => {
    const height = event.nativeEvent.layout.height;
    lengthMap.current.set(key, height);
  }, []);

  const _renderItem = useCallback((info: ListRenderItemInfo<any>): ReactElement => {
    if (fixedLength) {
      return render(info);
    } else {
      const key = keyExtractor(info.item);
      const onLayout = (event: LayoutChangeEvent): void => _onLayout(key, event);
      return render(info, onLayout);
    }
  }, []);

  const _getItemLayout = useCallback(
    (data: any, index: number) => {
      const length = getItemLength(index);
      const offset = getItemOffset(index);
      return {length, offset, index};
    },
    [getItemLength, getItemOffset],
  );

  return (
    <Animated.FlatList
      initialNumToRender={20}
      maxToRenderPerBatch={10}
      updateCellsBatchingPeriod={20}
      onEndReachedThreshold={1}
      {...props}
      data={data}
      renderItem={_renderItem}
      getItemLayout={_getItemLayout}
      keyExtractor={keyExtractor}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      removeClippedSubviews={Platform.OS === 'android'}
      ref={ref}
    />
  );
});

export default memo(FlatList);
