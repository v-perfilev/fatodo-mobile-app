import React, {MutableRefObject, useState} from 'react';
import {useTheme} from 'native-base';
import {ListUtils} from '../../shared/utils/ListUtils';
import DraggableFlatList, {DragEndParams, DraggableFlatListProps} from 'react-native-draggable-flatlist';
import {Animated, Platform, RefreshControl} from 'react-native';
import {createNativeWrapper} from 'react-native-gesture-handler';

type DraggableListProps<T> = Partial<DraggableFlatListProps<T>> & {
  keyExtractor: (item: T) => string;
  handleDragEnd: (params: DragEndParams<T>) => void;
  refresh?: () => Promise<void>;
  listRef?: MutableRefObject<any>;
};

const NativeRefreshControl = createNativeWrapper(RefreshControl, {
  disallowInterruption: true,
  shouldCancelWhenOutside: false,
});

const AnimatedDraggableList = Animated.createAnimatedComponent(DraggableFlatList);

const DraggableList = ({
  data,
  renderItem,
  keyExtractor,
  handleDragEnd,
  refresh,
  listRef,
  ...props
}: DraggableListProps<any>) => {
  const theme = useTheme();
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const _onRefresh = (): void => {
    setRefreshing(true);
    refresh().finally(() => setRefreshing(false));
  };

  const _refreshControl = (
    <NativeRefreshControl colors={[theme.colors.primary['500']]} refreshing={refreshing} onRefresh={_onRefresh} />
  );

  return (
    <AnimatedDraggableList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      onDragEnd={handleDragEnd}
      refreshControl={refresh ? _refreshControl : null}
      showsVerticalScrollIndicator={false}
      removeClippedSubviews={Platform.OS === 'android'}
      style={ListUtils.draggableStyle}
      ref={listRef}
      {...props}
      initialNumToRender={props.initialNumToRender || 15}
      maxToRenderPerBatch={props.maxToRenderPerBatch || 15}
      onEndReachedThreshold={props.onEndReachedThreshold || 10}
      windowSize={props.windowSize || 15}
    />
  );
};

export default DraggableList;
