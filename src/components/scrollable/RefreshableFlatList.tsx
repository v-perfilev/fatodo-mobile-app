import RefreshableContainer, {RefreshableContainerChildrenProps} from './containers/RefreshableContainer';
import FlatList, {FlatListProps} from './FlatList';
import React, {memo, ReactElement, ReactNode} from 'react';
import {Animated, StyleProp, ViewStyle} from 'react-native';
import ConditionalSpinner from '../surfaces/ConditionalSpinner';
import RegularHeaderContainer, {RegularHeaderContainerChildrenProps} from './containers/RegularHeaderContainer';

export type RefreshableFlatListChildrenProps = {
  scrollY: Animated.Value;
};

type ChildrenFuncType = (props: RefreshableFlatListChildrenProps) => ReactNode;

type RefreshableFlatListProps = Omit<FlatListProps<any>, 'children'> & {
  header?: ReactElement;
  loading?: boolean;
  refresh?: () => Promise<void>;
  previousNode?: ReactNode;
  nextNode?: ReactNode;
  loadingPlaceholder?: ReactElement;
  contentContainerStyle?: StyleProp<ViewStyle>;
  loaderStyle?: StyleProp<ViewStyle>;
  children?: ReactNode | ChildrenFuncType;
};

const RefreshableFlatList = React.forwardRef((props: RefreshableFlatListProps, ref: any) => {
  const {
    header,
    loading,
    refresh,
    previousNode,
    nextNode,
    loadingPlaceholder,
    inverted,
    loaderStyle,
    children,
    ...otherProps
  } = props;

  return (
    <RegularHeaderContainer header={header}>
      {({handleEventScroll, scrollY}: RegularHeaderContainerChildrenProps) => (
        <>
          {previousNode}
          <ConditionalSpinner loading={loading} loadingPlaceholder={loadingPlaceholder} style={loaderStyle}>
            <RefreshableContainer refresh={refresh} parentScrollY={scrollY} inverted={inverted}>
              {({refresher}: RefreshableContainerChildrenProps) => (
                <FlatList
                  ListHeaderComponent={refresher}
                  onScroll={handleEventScroll}
                  ref={ref}
                  inverted={inverted}
                  {...otherProps}
                />
              )}
            </RefreshableContainer>
          </ConditionalSpinner>
          {typeof children === 'function' ? children({scrollY}) : children}
          {nextNode}
        </>
      )}
    </RegularHeaderContainer>
  );
});

export default memo(RefreshableFlatList);
