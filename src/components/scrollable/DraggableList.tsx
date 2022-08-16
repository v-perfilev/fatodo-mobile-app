import React, {ForwardedRef} from 'react';
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
      {...props}
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      onDragEnd={handleDragEnd}
      showsVerticalScrollIndicator={false}
      removeClippedSubviews={Platform.OS === 'android'}
      style={ListUtils.draggableStyle}
      initialNumToRender={props.initialNumToRender || 15}
      maxToRenderPerBatch={props.maxToRenderPerBatch || 15}
      onEndReachedThreshold={props.onEndReachedThreshold || 10}
      windowSize={props.windowSize || 15}
      ref={ref}
    />
  );
});

export default DraggableList;
