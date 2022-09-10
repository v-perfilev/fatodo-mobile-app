import CollapsableHeaderContainer, {CollapsableHeaderChildrenProps} from './CollapsableHeaderContainer';
import React, {memo, ReactElement} from 'react';
import DraggableList, {DraggableListProps} from './DraggableList';
import {RefUtils} from '../../shared/utils/RefUtils';
import {StyleProp, ViewStyle} from 'react-native';

type CollapsableDraggableListProps = DraggableListProps<any> & {
  header?: ReactElement;
  containerStyle?: StyleProp<ViewStyle>;
};

const flexStyle: StyleProp<ViewStyle> = {flexGrow: 1};

const CollapsableDraggableList = React.forwardRef((props: CollapsableDraggableListProps, ref: any) => {
  const {header, containerStyle} = props;

  return (
    <CollapsableHeaderContainer header={header}>
      {({handleOffsetScroll, handleEventSnap, collapsableRef}: CollapsableHeaderChildrenProps) => (
        <DraggableList
          onScrollOffsetChange={handleOffsetScroll}
          onMomentumScrollEnd={handleEventSnap}
          ref={RefUtils.merge(ref, collapsableRef)}
          contentContainerStyle={[flexStyle, containerStyle]}
          {...props}
        />
      )}
    </CollapsableHeaderContainer>
  );
});

export default memo(CollapsableDraggableList);
