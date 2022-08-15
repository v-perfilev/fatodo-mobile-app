import CollapsableHeaderContainer, {CollapsableHeaderChildrenProps} from './CollapsableHeaderContainer';
import ConditionalSpinner from './ConditionalSpinner';
import RefreshableContainer, {RefreshableChildrenProps} from './RefreshableContainer';
import FlatList, {FlatListProps} from './FlatList';
import {ListUtils} from '../../shared/utils/ListUtils';
import EventListSeparator from '../../screens/events/eventList/EventListSeparator';
import {RefUtils} from '../../shared/utils/RefUtils';
import React, {ReactElement, ReactNode} from 'react';
import Refresher from './Refresher';

type CollapsableRefreshableFlatListProps = FlatListProps<any> & {
  header: ReactElement;
  headerHeight: number;
  refresh?: () => Promise<void>;
  loading?: boolean;
  previousNode?: ReactNode;
  nextNode?: ReactNode;
  children?: ReactNode;
};

const CollapsableRefreshableFlatList = React.forwardRef((props: CollapsableRefreshableFlatListProps, ref: any) => {
  const {header, headerHeight, refresh, loading, previousNode, nextNode, children} = props;

  return (
    <CollapsableHeaderContainer header={header}>
      {({handleEventScroll, handleEventSnap, collapsableRef, scrollY}: CollapsableHeaderChildrenProps) => (
        <>
          {previousNode}
          <ConditionalSpinner loading={loading} paddingTop={headerHeight}>
            <RefreshableContainer refresh={refresh} parentScrollY={scrollY}>
              {({extraScrollY, refreshing, refreshableRef}: RefreshableChildrenProps) => (
                <FlatList
                  ListHeaderComponent={
                    <Refresher extraScrollY={extraScrollY} refreshing={refreshing} inverted={props.inverted} />
                  }
                  contentContainerStyle={ListUtils.containerStyle(0, headerHeight)}
                  ItemSeparatorComponent={EventListSeparator}
                  onScroll={handleEventScroll}
                  onMomentumScrollEnd={handleEventSnap}
                  ref={RefUtils.merge(ref, collapsableRef, refreshableRef)}
                  {...props}
                />
              )}
            </RefreshableContainer>
            {children}
          </ConditionalSpinner>
          {nextNode}
        </>
      )}
    </CollapsableHeaderContainer>
  );
});

export default CollapsableRefreshableFlatList;
