import React, {Dispatch, memo, ReactElement, SetStateAction, useEffect, useMemo} from 'react';
import {Animated, StyleProp, useWindowDimensions, ViewStyle} from 'react-native';

type NotificationBaseProps = {
  display: boolean;
  setDisplay: Dispatch<SetStateAction<boolean>>;
  children: (props: NotificationBaseChildrenProps) => ReactElement;
};

export type NotificationBaseChildrenProps = {
  close: () => void;
};

const NotificationBase = ({display, setDisplay, children}: NotificationBaseProps) => {
  const {width} = useWindowDimensions();

  const translateXValue = new Animated.Value(0);
  const opacityValue = new Animated.Value(1);

  const show = () => {
    Animated.timing(translateXValue, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  const close = () => {
    Animated.sequence([
      Animated.timing(translateXValue, {toValue: 1, duration: 0, useNativeDriver: true}),
      Animated.timing(opacityValue, {toValue: 0, duration: 300, useNativeDriver: true}),
      Animated.timing(translateXValue, {toValue: 0, duration: 0, useNativeDriver: true}),
      Animated.timing(opacityValue, {toValue: 1, duration: 0, useNativeDriver: true}),
    ]).start(() => setDisplay(false));
  };

  const translateX = translateXValue.interpolate({
    inputRange: [0, 1],
    outputRange: [width, 0],
  });

  const opacity = opacityValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  useEffect(() => {
    display && show();
    !display && close();
  }, [display]);

  const childrenProps: NotificationBaseChildrenProps = {close};
  const childWithProps = useMemo<ReactElement>(() => children(childrenProps), [children, close]);

  const absolutePositionStyle: StyleProp<ViewStyle> = {
    zIndex: 100,
    position: 'absolute',
    top: 15,
    left: 15,
    right: 15,
  };
  const translateStyle = {transform: [{translateX}], opacity};

  return <Animated.View style={[absolutePositionStyle, translateStyle]}>{childWithProps}</Animated.View>;
};

const propsAreEqual = (prevProps: NotificationBaseProps, nextProps: NotificationBaseProps) => {
  return prevProps.display === nextProps.display && prevProps.children === nextProps.children;
};

export default memo(NotificationBase, propsAreEqual);
