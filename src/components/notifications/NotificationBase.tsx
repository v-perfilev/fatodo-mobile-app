import React, {memo, PropsWithChildren, Ref, useImperativeHandle, useRef} from 'react';
import {Animated, Platform, StyleProp, useWindowDimensions, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type NotificationBaseProps = PropsWithChildren<{
  notificationBaseRef: Ref<NotificationBaseMethods>;
}>;

export type NotificationBaseMethods = {
  show: () => void;
  close: () => Promise<void>;
};

const NotificationBase = ({notificationBaseRef, children}: NotificationBaseProps) => {
  const {width} = useWindowDimensions();
  const {top} = useSafeAreaInsets();

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

  const absolutePositionStyle = (topInset: number): StyleProp<ViewStyle> => ({
    zIndex: 100,
    position: 'absolute',
    top: Platform.OS === 'android' ? 15 : 15 + topInset,
    left: 15,
    right: 15,
  });
  const translateStyle = {transform: [{translateX}], opacity};

  return <Animated.View style={[absolutePositionStyle(top), translateStyle]}>{children}</Animated.View>;
};

export default memo(NotificationBase);
