import {Box, IIconButtonProps, ScaleFade} from 'native-base';
import {Animated, StyleProp, ViewStyle} from 'react-native';
import {CornerButton} from '../../models/CornerButton';
import IconButton from './IconButton';
import React, {RefObject, useEffect, useRef, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import CompositeAnimation = Animated.CompositeAnimation;

type CornerManagementProps = {
  buttons: CornerButton[];
  scrollY?: Animated.Value;
};

const isButtonShown = (button: CornerButton, onTop: boolean): boolean => {
  const hideOnTop = onTop && button.hideOnTop;
  const hideOnScroll = !onTop && button.hideOnScroll;
  return !button.hidden && !hideOnTop && !hideOnScroll;
};

const calculatePositions = (buttons: CornerButton[], onTop: boolean): number[] => {
  const CORNER_MANAGEMENT_BUTTON_PADDING = 55;
  let shownIndex = buttons.filter((button) => isButtonShown(button, onTop)).length;
  return buttons
    .map((button) => isButtonShown(button, onTop))
    .map((show) => (show ? --shownIndex : -2))
    .map((index) => -index * CORNER_MANAGEMENT_BUTTON_PADDING);
};

const createAnimatedValues = (positions: number[]): RefObject<Animated.Value>[] => {
  return positions
    .map((position) => new Animated.Value(position))
    .map((animatedValue) => React.useRef<Animated.Value>(animatedValue));
};

const CornerManagementButton = ({button, ...props}: IIconButtonProps & {button: CornerButton}) => {
  return (
    <IconButton
      icon={button.icon}
      onPress={button.action}
      bgColorScheme={button.color || 'primary'}
      colorScheme="white"
      bgTransparency="80"
      size={30}
      {...props}
    />
  );
};

const CornerManagement = ({buttons, scrollY}: CornerManagementProps) => {
  const isFocused = useIsFocused();
  const [positions, setPositions] = useState<number[]>(calculatePositions(buttons, true));
  const positionValues = createAnimatedValues(positions);

  const [onTop, setOnTop] = useState<boolean>(true);
  const onTopRef = useRef<boolean>(true);

  const handleScrollY = ({value}: {value: number}): void => {
    if (onTopRef.current === true && value > 0) {
      onTopRef.current = false;
      setOnTop(false);
    } else if (onTopRef.current === false && value <= 0) {
      onTopRef.current = true;
      setOnTop(true);
    }
  };

  const animatePositions = (): void => {
    const createTiming = (position: number, index: number): CompositeAnimation =>
      Animated.timing(positionValues[index].current, {toValue: position, useNativeDriver: true});
    const compositeAnimations = positions.map((position, index) => createTiming(position, index));
    Animated.parallel(compositeAnimations).start();
  };

  scrollY && scrollY.addListener(handleScrollY);

  useEffect(() => {
    const positions = calculatePositions(buttons, onTop);
    setPositions(positions);
  }, [onTop]);

  useEffect(() => {
    animatePositions();
  }, [positions]);

  const viewStyle: StyleProp<ViewStyle> = {position: 'absolute', bottom: 0, right: 0};

  return (
    <Box zIndex="100" position="absolute" bottom="3" right="3" bg={'red.50'}>
      {buttons.map((button, index) => (
        <Animated.View key={index} style={[{translateY: positionValues[index].current}, viewStyle]}>
          <ScaleFade in={isFocused} duration={2000}>
            <CornerManagementButton button={button} />
          </ScaleFade>
        </Animated.View>
      ))}
    </Box>
  );
};

export default CornerManagement;
