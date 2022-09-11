import React, {memo} from 'react';
import {Box, Image} from 'native-base';
import {Animated, Easing, StyleProp} from 'react-native';

const img = require('../../../assets/images/logo.png');
const imgGrayscale = require('../../../assets/images/logo-grayscale.png');

type LoaderProps = {
  size?: number;
  grayscale?: Animated.Value;
};

const Loader = ({size = 35, grayscale}: LoaderProps) => {
  const spinValue = new Animated.Value(0);

  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 1500,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
  ).start();

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const invertedGrayscale = grayscale?.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const absolutePositionStyle: StyleProp<any> = {position: 'absolute', top: 0, left: 0};

  const animatedGrayscaleStyle = {opacity: invertedGrayscale || 0};

  const animatedSpinStyle = {transform: [{rotate: spin}]};

  return (
    <Animated.View style={animatedSpinStyle}>
      <Box width={size} height={size}>
        <Image source={img} width={size} height={size} style={absolutePositionStyle} alt="Fatodo" />
        <Animated.View style={[absolutePositionStyle, animatedGrayscaleStyle]}>
          <Image source={imgGrayscale} width={size} height={size} alt="Fatodo" />
        </Animated.View>
      </Box>
    </Animated.View>
  );
};

export default memo(Loader);
