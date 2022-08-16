import CollapsableHeaderContainer, {CollapsableHeaderChildrenProps} from './CollapsableHeaderContainer';
import ConditionalSpinner from './ConditionalSpinner';
import RefreshableContainer, {RefreshableChildrenProps} from './RefreshableContainer';
import FlatList, {FlatListProps} from './FlatList';
import {ListUtils} from '../../shared/utils/ListUtils';
import EventListSeparator from '../../screens/events/eventList/EventListSeparator';
import {RefUtils} from '../../shared/utils/RefUtils';
import React, {ReactElement, ReactNode} from 'react';
import Refresher from './Refresher';
import {Animated} from 'react-native';

export type CollapsableRefreshableChildrenProps = {
  scrollY: Animated.Value;
};

type ChildrenFuncType = (props: CollapsableRefreshableChildrenProps) => ReactNode;

type CollapsableRefreshableFlatListProps = FlatListProps<any> & {
  header: ReactElement;
  headerHeight: number;
  refresh?: () => Promise<void>;
  loading?: boolean;
  previousNode?: ReactNode;
  nextNode?: ReactNode;
  children?: ReactNode | ChildrenFuncType;
};

const CollapsableRefreshableFlatList = React.forwardRef((props: CollapsableRefreshableFlatListProps, ref: any) => {
  const {header, headerHeight, refresh, loading, previousNode, nextNode, inverted, children} = props;

  return (
    <CollapsableHeaderContainer header={header}>
      {({handleEventScroll, handleEventSnap, collapsableRef, scrollY}: CollapsableHeaderChildrenProps) => (
        <>
          {previousNode}
          <ConditionalSpinner loading={loading} paddingTop={headerHeight}>
            <RefreshableContainer refresh={refresh} parentScrollY={scrollY} inverted={inverted}>
              {({extraScrollY, refreshing, refreshableRef}: RefreshableChildrenProps) => (
                <FlatList
                  ListHeaderComponent={
                    <Refresher extraScrollY={extraScrollY} refreshing={refreshing} inverted={inverted} />
                  }
                  contentContainerStyle={ListUtils.containerStyle(
                    0,
                    !inverted ? headerHeight : undefined,
                    inverted ? headerHeight : undefined,
                  )}
                  ItemSeparatorComponent={EventListSeparator}
                  onScroll={handleEventScroll}
                  onMomentumScrollEnd={handleEventSnap}
                  ref={RefUtils.merge(ref, collapsableRef, refreshableRef)}
                  inverted={inverted}
                  {...props}
                />
              )}
            </RefreshableContainer>
            {typeof children === 'function' ? children({scrollY}) : children}
          </ConditionalSpinner>
          {nextNode}
        </>
      )}
    </CollapsableHeaderContainer>
  );
});

export default CollapsableRefreshableFlatList;
