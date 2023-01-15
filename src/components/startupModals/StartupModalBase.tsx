import React, {memo, PropsWithChildren, useEffect, useRef} from 'react';
import {Animated, StyleProp, useWindowDimensions, ViewStyle} from 'react-native';

type StartupModalBaseProps = PropsWithChildren<{
  show: boolean;
}>;

const StartupModalBase = ({show, children}: StartupModalBaseProps) => {
  const animatedValue = useRef(new Animated.Value(0));
  const {height} = useWindowDimensions();

  const animateOpen = (): void => {
    Animated.timing(animatedValue.current, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };

  const animateClose = (): void => {
    Animated.timing(animatedValue.current, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    show ? animateOpen() : animateClose();
  }, [show]);

  const interpolatedValue = animatedValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: [height, 0],
  });

  const animatedStyle = {transform: [{translateY: interpolatedValue}]};

  return <Animated.View style={[absoluteContentPositionStyle, animatedStyle]}>{children}</Animated.View>;
};

const absoluteContentPositionStyle: StyleProp<ViewStyle> = {
  zIndex: 100,
  position: 'absolute',
  left: 15,
  right: 15,
  bottom: 10,
};

export default memo(StartupModalBase);
