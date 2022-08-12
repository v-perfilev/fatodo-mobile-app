import {Animated, NativeScrollEvent, NativeSyntheticEvent} from 'react-native';
import AnimatedInterpolation = Animated.AnimatedInterpolation;

export class AnimatedUtils {
  public static createHeaderAnimatedValue = (): Animated.Value => new Animated.Value(0);

  public static handleHeaderAnimatedValue = (height: number, value?: Animated.Value): AnimatedInterpolation =>
    value?.interpolate({
      inputRange: [0, 2 * height],
      outputRange: [0, -height],
      extrapolate: 'clamp',
    });

  public static headerEvent = (value: Animated.Value): ((event: NativeSyntheticEvent<NativeScrollEvent>) => void) =>
    Animated.event([{nativeEvent: {contentOffset: {y: value}}}], {useNativeDriver: false});
}
