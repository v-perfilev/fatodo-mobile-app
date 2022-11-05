import React, {ForwardedRef, memo} from 'react';
import DraggableFlatList, {DragEndParams, DraggableFlatListProps} from 'react-native-draggable-flatlist';
import {Animated, Platform, StyleProp, ViewStyle} from 'react-native';

export type DraggableListProps<T> = Partial<DraggableFlatListProps<T>> & {
  keyExtractor: (item: T) => string;
  handleDragEnd: (params: DragEndParams<T>) => void;
};

const AnimatedDraggableList = Animated.createAnimatedComponent(DraggableFlatList);

const DraggableList = React.forwardRef((props: DraggableListProps<any>, ref: ForwardedRef<any>) => {
  const {data, renderItem, keyExtractor, handleDragEnd, containerStyle} = props;

  const style: StyleProp<ViewStyle> = {minHeight: '100%'};

  return (
    <AnimatedDraggableList
      initialNumToRender={20}
      maxToRenderPerBatch={10}
      updateCellsBatchingPeriod={20}
      onEndReachedThreshold={2}
      {...props}
      containerStyle={[style, containerStyle]}
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      onDragEnd={handleDragEnd}
      showsVerticalScrollIndicator={false}
      removeClippedSubviews={Platform.OS === 'android'}
      ref={ref}
    />
  );
});

export default memo(DraggableList);
