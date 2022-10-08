import CollapsableHeaderContainer, {
  CollapsableHeaderContainerChildrenProps,
} from './containers/CollapsableHeaderContainer';
import RefreshableContainer, {RefreshableContainerChildrenProps} from './containers/RefreshableContainer';
import FlatList, {FlatListProps} from './FlatList';
import {RefUtils} from '../../shared/utils/RefUtils';
import React, {memo, ReactElement, ReactNode} from 'react';
import {Animated, StyleProp, ViewStyle} from 'react-native';
import ConditionalSpinner from '../surfaces/ConditionalSpinner';

export type CollapsableRefreshableFlatListChildrenProps = {
  scrollY: Animated.Value;
};

type ChildrenFuncType = (props: CollapsableRefreshableFlatListChildrenProps) => ReactNode;

type CollapsableRefreshableFlatListProps = Omit<FlatListProps<any>, 'children'> & {
  header?: ReactElement;
  loading?: boolean;
  refresh?: () => Promise<void>;
  previousNode?: ReactNode;
  nextNode?: ReactNode;
  loadingPlaceholder?: ReactElement;
  containerStyle?: StyleProp<ViewStyle>;
  loaderStyle?: StyleProp<ViewStyle>;
  children?: ReactNode | ChildrenFuncType;
};

const flexStyle: StyleProp<ViewStyle> = {flexGrow: 1};

const CollapsableRefreshableFlatList = React.forwardRef((props: CollapsableRefreshableFlatListProps, ref: any) => {
  const {
    header,
    loading,
    refresh,
    previousNode,
    nextNode,
    loadingPlaceholder,
    inverted,
    containerStyle,
    loaderStyle,
    children,
    ...otherProps
  } = props;

  return (
    <CollapsableHeaderContainer header={header}>
      {({handleEventScroll, handleEventSnap, collapsableRef, scrollY}: CollapsableHeaderContainerChildrenProps) => (
        <>
          {previousNode}
          <ConditionalSpinner loading={loading} loadingPlaceholder={loadingPlaceholder} style={loaderStyle}>
            <RefreshableContainer refresh={refresh} parentScrollY={scrollY} inverted={inverted}>
              {({refresher}: RefreshableContainerChildrenProps) => (
                <FlatList
                  ListHeaderComponent={refresher}
                  onScroll={handleEventScroll}
                  onMomentumScrollEnd={handleEventSnap}
                  ref={RefUtils.merge(ref, collapsableRef)}
                  inverted={inverted}
                  contentContainerStyle={[flexStyle, containerStyle]}
                  {...otherProps}
                />
              )}
            </RefreshableContainer>
          </ConditionalSpinner>
          {typeof children === 'function' ? children({scrollY}) : children}
          {nextNode}
        </>
      )}
    </CollapsableHeaderContainer>
  );
});

export default memo(CollapsableRefreshableFlatList);
