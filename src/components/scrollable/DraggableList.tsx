import React, {ForwardedRef, memo} from 'react';
import DraggableFlatList, {DragEndParams, DraggableFlatListProps} from 'react-native-draggable-flatlist';
import {Animated, Platform, StyleProp, ViewStyle} from 'react-native';

export type DraggableListProps<T> = Partial<DraggableFlatListProps<T>> & {
  keyExtractor: (item: T) => string;
  handleDragEnd: (params: DragEndParams<T>) => void;
};

const AnimatedDraggableList = Animated.createAnimatedComponent(DraggableFlatList);

const draggableListStyle: StyleProp<ViewStyle> = {height: '100%'};

const DraggableList = React.forwardRef((props: DraggableListProps<any>, ref: ForwardedRef<any>) => {
  const {data, renderItem, keyExtractor, handleDragEnd} = props;

  return (
    <AnimatedDraggableList
      initialNumToRender={20}
      maxToRenderPerBatch={10}
      updateCellsBatchingPeriod={20}
      onEndReachedThreshold={2}
      {...props}
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      onDragEnd={handleDragEnd}
      showsVerticalScrollIndicator={false}
      removeClippedSubviews={Platform.OS === 'android'}
      style={draggableListStyle}
      ref={ref}
    />
  );
});

export default memo(DraggableList);
