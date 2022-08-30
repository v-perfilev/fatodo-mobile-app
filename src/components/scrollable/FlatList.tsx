import React, {ForwardedRef, memo, ReactElement, useCallback, useRef} from 'react';
import {IFlatListProps} from 'native-base/lib/typescript/components/basic/FlatList';
import {Animated, FlatList as RNFlatList, LayoutChangeEvent, ListRenderItemInfo, Platform} from 'react-native';

export type FlatListType = RNFlatList;

export type FlatListProps<T> = Partial<IFlatListProps<T>> & {
  render: (item: T, onLayout: (event: LayoutChangeEvent) => void) => ReactElement;
  keyExtractor: (item: T) => string;
  fixedLength?: number;
};

const FlatList = React.forwardRef((props: FlatListProps<any>, ref: ForwardedRef<any>) => {
  const {data, render, keyExtractor, fixedLength} = props;
  const lengthMap = useRef<Map<string, number>>(new Map());

  const getItemLength = useCallback(
    (index: number): number => {
      let length;
      if (fixedLength) {
        length = fixedLength;
      } else {
        const item = data[index];
        const key = keyExtractor(item);
        length = lengthMap.current.get(key) || 0;
      }
      return length;
    },
    [fixedLength, data, keyExtractor, lengthMap],
  );

  const getItemOffset = useCallback(
    (index: number): number => {
      let offset;
      if (fixedLength) {
        offset = index * fixedLength;
      } else {
        offset = Array.from(Array(index).keys())
          .map((i) => getItemLength(i))
          .reduce((a, c) => a + c, 0);
      }
      return offset;
    },
    [fixedLength, getItemLength],
  );

  const _onLayout = useCallback(
    (key: string, event: LayoutChangeEvent): void => {
      if (!fixedLength) {
        const height = event.nativeEvent.layout.height;
        lengthMap.current.set(key, height);
      }
    },
    [fixedLength, lengthMap.current],
  );

  const _renderItem = useCallback(
    (info: ListRenderItemInfo<any>): ReactElement => {
      const key = keyExtractor(info.item);
      const onLayout = (event: LayoutChangeEvent): void => _onLayout(key, event);
      return render(info.item, onLayout);
    },
    [keyExtractor, _onLayout, render],
  );

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
      onEndReachedThreshold={0.5}
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
