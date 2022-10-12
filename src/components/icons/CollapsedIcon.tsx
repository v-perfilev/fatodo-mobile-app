import React, {useEffect, useRef} from 'react';
import {IIconProps} from 'native-base';
import ArrowDownIcon from './ArrowDownIcon';
import {Animated} from 'react-native';

type CollapsedIconProps = IIconProps & {
  collapsed: boolean;
};

const CollapsedIcon = ({collapsed, ...props}: CollapsedIconProps) => {
  const value = useRef(new Animated.Value(collapsed ? 0 : 1)).current;

  const spin = value.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg'],
  });

  const animate = (to: number) => {
    Animated.timing(value, {toValue: to, duration: 300, useNativeDriver: true}).start();
  };

  useEffect(() => {
    animate(collapsed ? 0 : 1);
  }, [collapsed]);

  const animatedStyle = {transform: [{rotateZ: spin}]};

  return (
    <Animated.View style={animatedStyle}>
      <ArrowDownIcon {...props} />
    </Animated.View>
  );
};

export default CollapsedIcon;
