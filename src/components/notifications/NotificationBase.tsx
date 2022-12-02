import React, {memo, PropsWithChildren, Ref, useImperativeHandle, useRef} from 'react';
import {Animated, StyleProp, useWindowDimensions, ViewStyle} from 'react-native';

type NotificationBaseProps = PropsWithChildren<{
  notificationBaseRef: Ref<NotificationBaseMethods>;
}>;

export type NotificationBaseMethods = {
  show: () => void;
  close: () => Promise<void>;
};

const NotificationBase = ({notificationBaseRef, children}: NotificationBaseProps) => {
  const {width} = useWindowDimensions();

  const translateXValue = useRef(new Animated.Value(0));
  const opacityValue = useRef(new Animated.Value(1));

  const show = () => {
    Animated.timing(translateXValue.current, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  const close = (): Promise<void> =>
    new Promise((resolve) => {
      Animated.sequence([
        Animated.timing(opacityValue.current, {toValue: 0, duration: 300, useNativeDriver: true}),
        Animated.timing(translateXValue.current, {toValue: 0, duration: 0, useNativeDriver: true}),
        Animated.timing(opacityValue.current, {toValue: 1, duration: 0, useNativeDriver: true}),
      ]).start(() => resolve());
    });

  useImperativeHandle(
    notificationBaseRef,
    (): NotificationBaseMethods => ({
      show,
      close,
    }),
    [],
  );

  const translateX = translateXValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: [width, 0],
  });

  const opacity = opacityValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const absolutePositionStyle: StyleProp<ViewStyle> = {
    zIndex: 100,
    position: 'absolute',
    top: 15,
    left: 15,
    right: 15,
  };
  const translateStyle = {transform: [{translateX}], opacity};

  return <Animated.View style={[absolutePositionStyle, translateStyle]}>{children}</Animated.View>;
};

export default memo(NotificationBase);
