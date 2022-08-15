import {Animated, StyleProp} from 'react-native';
import React from 'react';
import {Spinner, Text} from 'native-base';
import {MAX_REFRESH_HEIGHT} from '../../constants';
import FCenter from '../boxes/FCenter';

type RefresherProps = {
  paddingTop: Animated.Value;
  refreshing: boolean;
};

const Refresher = ({paddingTop, refreshing}: RefresherProps) => {
  const animatedStyle: StyleProp<any> = {paddingTop};

  return (
    <Animated.View style={animatedStyle}>
      <FCenter position="absolute" left="0" right="0" bottom="0" height={MAX_REFRESH_HEIGHT}>
        <Spinner size="lg" />
        <Text>{refreshing ? 'loading' : ''}</Text>
      </FCenter>
    </Animated.View>
  );
};

export default Refresher;
