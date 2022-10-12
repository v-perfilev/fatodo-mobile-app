import React, {memo, ReactElement, ReactNode} from 'react';
import DraggableList, {DraggableListProps} from './DraggableList';
import {Animated, StyleProp, ViewStyle} from 'react-native';
import ConditionalSpinner from '../surfaces/ConditionalSpinner';
import RefreshableContainer, {RefreshableContainerChildrenProps} from './containers/RefreshableContainer';
import CollapsableHeaderContainer, {
  CollapsableHeaderContainerChildrenProps,
} from './containers/CollapsableHeaderContainer';
import {RefUtils} from '../../shared/utils/RefUtils';

export type CollapsableRefreshableDraggableListChildrenProps = {
  scrollY: Animated.Value;
};

type ChildrenFuncType = (props: CollapsableRefreshableDraggableListChildrenProps) => ReactNode;

type CollapsableRefreshableDraggableListProps = Omit<DraggableListProps<any>, 'children'> & {
  header?: ReactElement;
  loading?: boolean;
  sorting?: boolean;
  refresh?: () => Promise<void>;
  loadingPlaceholder?: ReactElement;
  containerStyle?: StyleProp<ViewStyle>;
  loaderStyle?: StyleProp<ViewStyle>;
  children?: ReactNode | ChildrenFuncType;
};

const flexStyle: StyleProp<ViewStyle> = {flexGrow: 1};

const CollapsableRefreshableDraggableList = React.forwardRef(
  (props: CollapsableRefreshableDraggableListProps, ref: any) => {
    const {
      header,
      loading,
      sorting,
      refresh,
      loadingPlaceholder,
      containerStyle,
      loaderStyle,
      children,
      ...otherProps
    } = props;

    return (
      <CollapsableHeaderContainer header={header}>
        {({handleOffsetScroll, handleEventSnap, scrollY, collapsableRef}: CollapsableHeaderContainerChildrenProps) => (
          <>
            <ConditionalSpinner loading={loading} loadingPlaceholder={loadingPlaceholder} style={loaderStyle}>
              <RefreshableContainer withGestureHandler refresh={!sorting && refresh} parentScrollY={scrollY}>
                {({refresher, refreshableRef, panRef}: RefreshableContainerChildrenProps) => (
                  <DraggableList
                    ListHeaderComponent={refresher}
                    onScrollOffsetChange={handleOffsetScroll}
                    onMomentumScrollEnd={handleEventSnap}
                    ref={RefUtils.merge(ref, collapsableRef, refreshableRef)}
                    simultaneousHandlers={panRef}
                    contentContainerStyle={[flexStyle, containerStyle]}
                    {...otherProps}
                  />
                )}
              </RefreshableContainer>
            </ConditionalSpinner>
            {typeof children === 'function' ? children({scrollY}) : children}
          </>
        )}
      </CollapsableHeaderContainer>
    );
  },
);

export default memo(CollapsableRefreshableDraggableList);
