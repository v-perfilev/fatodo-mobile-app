import {Animated, NativeScrollEvent, NativeSyntheticEvent, StyleProp, View, ViewStyle} from 'react-native';
import React, {memo, ReactElement, useCallback, useMemo, useRef} from 'react';

export type RegularHeaderContainerChildrenProps = {
  handleEventScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  scrollY: Animated.Value;
};

type RegularHeaderContainerProps = {
  header?: ReactElement;
  children: (props: RegularHeaderContainerChildrenProps) => ReactElement;
};

const safeAreaStyle: StyleProp<ViewStyle> = {flex: 1};
const headerStyle: StyleProp<ViewStyle> = {zIndex: 1, position: 'absolute', width: '100%'};

const RegularHeaderContainer = ({header, children}: RegularHeaderContainerProps) => {
  const scrollY = useRef<Animated.Value>(new Animated.Value(0));

  const handleEventScroll = useCallback(
    Animated.event([{nativeEvent: {contentOffset: {y: scrollY.current}}}], {
      useNativeDriver: true,
    }),
    [scrollY.current],
  );

  const childrenProps: RegularHeaderContainerChildrenProps = {
    handleEventScroll,
    scrollY: scrollY.current,
  };

  const childWithProps = useMemo<ReactElement>(() => children(childrenProps), [children, handleEventScroll]);

  return (
    <View style={safeAreaStyle}>
      {header && <View style={headerStyle}>{header}</View>}
      {childWithProps}
    </View>
  );
};

export default memo(RegularHeaderContainer);
