import CollapsableHeaderContainer, {CollapsableHeaderChildrenProps} from './CollapsableHeaderContainer';
import ConditionalSpinner from '../surfaces/ConditionalSpinner';
import {ListUtils} from '../../shared/utils/ListUtils';
import React, {ReactElement, ReactNode} from 'react';
import DraggableList, {DraggableListProps} from './DraggableList';
import {RefUtils} from '../../shared/utils/RefUtils';

type CollapsableDraggableListProps = DraggableListProps<any> & {
  header: ReactElement;
  headerHeight: number;
  loading?: boolean;
  children?: ReactNode;
};

const CollapsableDraggableList = React.forwardRef((props: CollapsableDraggableListProps, ref: any) => {
  const {header, headerHeight, loading, children} = props;

  return (
    <CollapsableHeaderContainer header={header}>
      {({handleOffsetScroll, handleEventSnap, collapsableRef}: CollapsableHeaderChildrenProps) => (
        <ConditionalSpinner loading={loading} paddingTop={headerHeight}>
          <DraggableList
            contentContainerStyle={ListUtils.containerStyle(0, headerHeight)}
            onScrollOffsetChange={handleOffsetScroll}
            onMomentumScrollEnd={handleEventSnap}
            ref={RefUtils.merge(ref, collapsableRef)}
            {...props}
          />
          {children}
        </ConditionalSpinner>
      )}
    </CollapsableHeaderContainer>
  );
});

export default CollapsableDraggableList;
