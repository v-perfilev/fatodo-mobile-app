import React, {memo} from 'react';
import {IBoxProps} from 'native-base';
import {REFRESH_HEIGHT} from '../../constants';
import FCenter from '../boxes/FCenter';
import {Animated} from 'react-native';
import Loader from '../layouts/Loader';

type RefresherProps = IBoxProps & {
  refreshing: Animated.Value;
  extraScrollY: Animated.Value;
};

const Refresher = ({refreshing, extraScrollY, ...props}: RefresherProps) => {
  const refresherAnimation = extraScrollY.interpolate({
    inputRange: [0, 0.25, REFRESH_HEIGHT],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
  });

  const animatedRefresherStyle = {transform: [{scale: refresherAnimation}]};

  return (
    <FCenter height={REFRESH_HEIGHT} {...props}>
      <Animated.View style={animatedRefresherStyle}>
        <Loader size={45} grayscale={refreshing} />
      </Animated.View>
    </FCenter>
  );
};

export default memo(Refresher);
