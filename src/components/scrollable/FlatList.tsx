import React, {ForwardedRef, memo, ReactElement, useCallback, useRef} from 'react';
import {IFlatListProps} from 'native-base/lib/typescript/components/basic/FlatList';
import {
  Animated,
  FlatList as RNFlatList,
  LayoutChangeEvent,
  ListRenderItemInfo,
  Platform,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {DEFAULT_FLAT_LIST_ITEM_HEIGHT} from '../../constants';
import {FlatList as GestureFlatList} from 'react-native-gesture-handler';
import {NativeViewGestureHandlerProps} from 'react-native-gesture-handler/src/handlers/NativeViewGestureHandler';

export type FlatListType = RNFlatList;

export type FlatListProps<T> = Partial<IFlatListProps<T>> &
  NativeViewGestureHandlerProps & {
    render: (info: ListRenderItemInfo<T>, onLayout?: (event: LayoutChangeEvent) => void) => ReactElement;
    keyExtractor?: (item: T) => string;
    fixedLength?: number;
    notFullHeight?: boolean;
  };

const AnimatedGestureFlatList = Animated.createAnimatedComponent<any>(GestureFlatList);

const FlatList = React.forwardRef((props: FlatListProps<any>, ref: ForwardedRef<any>) => {
  const {data, render, keyExtractor, fixedLength, contentContainerStyle, notFullHeight} = props;
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

  const style: StyleProp<ViewStyle> = {minHeight: notFullHeight ? undefined : '100%'};

  return (
    <AnimatedGestureFlatList
      initialNumToRender={20}
      maxToRenderPerBatch={20}
      updateCellsBatchingPeriod={10}
      onEndReachedThreshold={1}
      {...props}
      contentContainerStyle={[style, contentContainerStyle]}
      data={data}
      renderItem={_renderItem}
      getItemLayout={_getItemLayout}
      keyExtractor={keyExtractor}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      bounces={false}
      removeClippedSubviews={Platform.OS === 'android'}
      ref={ref}
    />
  );
});
export default memo(FlatList);
