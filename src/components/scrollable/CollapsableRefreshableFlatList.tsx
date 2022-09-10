import CollapsableHeaderContainer, {CollapsableHeaderChildrenProps} from './CollapsableHeaderContainer';
import RefreshableContainer, {RefreshableChildrenProps} from './RefreshableContainer';
import FlatList, {FlatListProps} from './FlatList';
import {RefUtils} from '../../shared/utils/RefUtils';
import React, {memo, ReactElement, ReactNode} from 'react';
import {Animated, StyleProp, ViewStyle} from 'react-native';
import ConditionalSpinner from '../surfaces/ConditionalSpinner';

export type CollapsableRefreshableChildrenProps = {
  scrollY: Animated.Value;
};

type ChildrenFuncType = (props: CollapsableRefreshableChildrenProps) => ReactNode;

type CollapsableRefreshableFlatListProps = FlatListProps<any> & {
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
  } = props;

  return (
    <CollapsableHeaderContainer header={header}>
      {({handleEventScroll, handleEventSnap, collapsableRef, scrollY}: CollapsableHeaderChildrenProps) => (
        <>
          {previousNode}
          <ConditionalSpinner loading={loading} loadingPlaceholder={loadingPlaceholder} style={loaderStyle}>
            <RefreshableContainer refresh={refresh} parentScrollY={scrollY} inverted={inverted}>
              {({refresher}: RefreshableChildrenProps) => (
                <FlatList
                  ListHeaderComponent={refresher}
                  onScroll={handleEventScroll}
                  onMomentumScrollEnd={handleEventSnap}
                  ref={RefUtils.merge(ref, collapsableRef)}
                  inverted={inverted}
                  contentContainerStyle={[flexStyle, containerStyle]}
                  {...props}
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
