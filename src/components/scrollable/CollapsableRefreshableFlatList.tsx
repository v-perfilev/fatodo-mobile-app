import CollapsableHeaderContainer, {CollapsableHeaderChildrenProps} from './CollapsableHeaderContainer';
import ConditionalSpinner from '../surfaces/ConditionalSpinner';
import RefreshableContainer, {RefreshableChildrenProps} from './RefreshableContainer';
import FlatList, {FlatListProps} from './FlatList';
import {ListUtils} from '../../shared/utils/ListUtils';
import {RefUtils} from '../../shared/utils/RefUtils';
import React, {memo, ReactElement, ReactNode} from 'react';
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
  previousNodeHeight?: number;
  nextNode?: ReactNode;
  nextNodeHeight?: number;
  children?: ReactNode | ChildrenFuncType;
};

const CollapsableRefreshableFlatList = React.forwardRef((props: CollapsableRefreshableFlatListProps, ref: any) => {
  const {
    header,
    headerHeight,
    refresh,
    loading,
    previousNode,
    previousNodeHeight,
    nextNode,
    nextNodeHeight,
    inverted,
    children,
  } = props;

  return (
    <CollapsableHeaderContainer header={header}>
      {({handleEventScroll, handleEventSnap, collapsableRef, scrollY}: CollapsableHeaderChildrenProps) => (
        <>
          {previousNode}
          <ConditionalSpinner loading={loading} mt={nextNodeHeight} mb={previousNodeHeight}>
            <RefreshableContainer refresh={refresh} parentScrollY={scrollY} inverted={inverted}>
              {({refresher}: RefreshableChildrenProps) => (
                <FlatList
                  ListHeaderComponent={refresher}
                  contentContainerStyle={ListUtils.containerStyle(
                    0,
                    !inverted ? headerHeight : undefined,
                    inverted ? headerHeight : undefined,
                  )}
                  onScroll={handleEventScroll}
                  onMomentumScrollEnd={handleEventSnap}
                  ref={RefUtils.merge(ref, collapsableRef)}
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

export default memo(CollapsableRefreshableFlatList);
