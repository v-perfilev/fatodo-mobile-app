import {Animated, StyleProp} from 'react-native';
import React from 'react';
import {Spinner, Text} from 'native-base';
import {MAX_REFRESH_HEIGHT} from '../../constants';
import FCenter from '../boxes/FCenter';

type RefresherProps = {
  extraScrollY: Animated.Value;
  refreshing: boolean;
  inverted?: boolean;
};

const Refresher = ({extraScrollY, refreshing, inverted}: RefresherProps) => {
  const animatedStyle: StyleProp<any> = {
    paddingTop: !inverted ? extraScrollY : undefined,
    paddingBottom: inverted ? extraScrollY : undefined,
  };

  return (
    <Animated.View style={animatedStyle}>
      <FCenter
        position="absolute"
        left="0"
        right="0"
        top={inverted ? 0 : undefined}
        bottom={!inverted ? 0 : undefined}
        height={MAX_REFRESH_HEIGHT}
      >
        <Spinner size="lg" />
        <Text>{refreshing ? 'loading' : ''}</Text>
      </FCenter>
    </Animated.View>
  );
};

export default Refresher;
