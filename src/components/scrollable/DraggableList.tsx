import React, {ForwardedRef, memo} from 'react';
import {ListUtils} from '../../shared/utils/ListUtils';
import DraggableFlatList, {DragEndParams, DraggableFlatListProps} from 'react-native-draggable-flatlist';
import {Animated, Platform} from 'react-native';

export type DraggableListProps<T> = Partial<DraggableFlatListProps<T>> & {
  keyExtractor: (item: T) => string;
  handleDragEnd: (params: DragEndParams<T>) => void;
};

const AnimatedDraggableList = Animated.createAnimatedComponent(DraggableFlatList);

const DraggableList = React.forwardRef((props: DraggableListProps<any>, ref: ForwardedRef<any>) => {
  const {data, renderItem, keyExtractor, handleDragEnd} = props;

  return (
    <AnimatedDraggableList
      onEndReachedThreshold={0.5}
      {...props}
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      onDragEnd={handleDragEnd}
      showsVerticalScrollIndicator={false}
      removeClippedSubviews={Platform.OS === 'android'}
      style={ListUtils.draggableStyle}
      ref={ref}
    />
  );
});

export default memo(DraggableList);
