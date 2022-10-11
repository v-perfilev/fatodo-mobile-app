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
  previousNode?: ReactNode;
  nextNode?: ReactNode;
  loadingPlaceholder?: ReactElement;
  containerStyle?: StyleProp<ViewStyle>;
  loaderStyle?: StyleProp<ViewStyle>;
  children?: ReactNode | ChildrenFuncType;
};

const flexStyle: StyleProp<ViewStyle> = {flexGrow: 1};

const LoadableFlatList = React.forwardRef((props: RefreshableFlatListProps, ref: any) => {
  const {
    header,
    loading,
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
    <RegularHeaderContainer header={header}>
      {({handleEventScroll, scrollY}: RegularHeaderContainerChildrenProps) => (
        <>
          {previousNode}
          <ConditionalSpinner loading={loading} loadingPlaceholder={loadingPlaceholder} style={loaderStyle}>
            <FlatList
              onScroll={handleEventScroll}
              ref={ref}
              inverted={inverted}
              contentContainerStyle={[flexStyle, containerStyle]}
              {...otherProps}
            />
          </ConditionalSpinner>
          {typeof children === 'function' ? children({scrollY}) : children}
          {nextNode}
        </>
      )}
    </RegularHeaderContainer>
  );
});

export default memo(LoadableFlatList);
