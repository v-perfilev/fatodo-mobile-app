import {Box, IIconButtonProps} from 'native-base';
import {Animated, StyleProp, ViewStyle} from 'react-native';
import {CornerButton} from '../../models/CornerButton';
import IconButton from './IconButton';
import React, {memo, RefObject, useEffect, useRef} from 'react';
import {SharedValue, useSharedValue} from 'react-native-reanimated';
import CompositeAnimation = Animated.CompositeAnimation;

type CornerManagementProps = {
  buttons: CornerButton[];
  scrollY?: Animated.Value;
};

const CORNER_MANAGEMENT_BUTTON_PADDING = 60;

const isButtonShown = (button: CornerButton, onTop: boolean, directScroll: boolean): boolean => {
  const hideOnTop = onTop && button.hideOnTop;
  const hideOnScroll = !onTop && (button.hideOnScroll || directScroll);
  return !button.hidden && !hideOnTop && !hideOnScroll;
};

const calculatePositions = (
  buttons: CornerButton[],
  maxButtonsInColumn: number,
  onTop = true,
  directScroll = true,
): number[] => {
  let shownIndex = buttons.filter((button) => isButtonShown(button, onTop, directScroll)).length;
  let hiddenIndex = -0.5 - maxButtonsInColumn + buttons.length;
  return buttons
    .map((button) => isButtonShown(button, onTop, directScroll))
    .map((show) => (show ? --shownIndex : --hiddenIndex))
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
      onPressIn={button.action}
      bgColorScheme={button.color || 'primary'}
      colorScheme="white"
      bgTransparency="100"
      size="30"
      p="3"
      {...props}
    />
  );
};

const CornerManagement = ({buttons, scrollY}: CornerManagementProps) => {
  const mainButtons = useRef<CornerButton[]>(buttons.filter((b) => !b.additionalColumn));
  const addButtons = useRef<CornerButton[]>(buttons.filter((b) => b.additionalColumn));
  const maxButtonsLength = useRef<number>(Math.max(mainButtons.current.length, addButtons.current.length));
  const mainButtonPositions = useSharedValue<number[]>(
    calculatePositions(mainButtons.current, maxButtonsLength.current),
  );
  const additionalButtonPositions = useSharedValue<number[]>(
    calculatePositions(addButtons.current, maxButtonsLength.current),
  );
  const mainPositionValues = createAnimatedValues(mainButtonPositions.value);
  const additionalPositionValues = createAnimatedValues(additionalButtonPositions.value);
  const onTop = useRef<boolean>(true);
  const directScroll = useRef<boolean>(true);
  const prevScrollValue = useRef<number>(0);

  const animateButtons = (
    buttons: CornerButton[],
    positions: SharedValue<number[]>,
    positionValues: RefObject<Animated.Value>[],
  ): void => {
    const newPositions = calculatePositions(buttons, maxButtonsLength.current, onTop.current, directScroll.current);
    if (JSON.stringify(positions.value) !== JSON.stringify(newPositions)) {
      positions.value = newPositions;
      const createTiming = (position: number, index: number): CompositeAnimation =>
        Animated.timing(positionValues[index].current, {toValue: position, useNativeDriver: true});
      const animations = newPositions.map((position, index) => createTiming(position, index));
      Animated.parallel(animations).start();
    }
  };

  const animateAllButtons = (): void => {
    animateButtons(mainButtons.current, mainButtonPositions, mainPositionValues);
    animateButtons(addButtons.current, additionalButtonPositions, additionalPositionValues);
  };

  const handleScrollY = ({value}: {value: number}): void => {
    let shouldAnimate = false;

    // handle onTop
    if (onTop.current === true && value > 0) {
      onTop.current = false;
      shouldAnimate = true;
    } else if (onTop.current === false && value <= 0) {
      onTop.current = true;
      shouldAnimate = true;
    }
    // handleDirectScroll
    const isDirectScroll = value - prevScrollValue.current > 0;
    if (value !== prevScrollValue.current && isDirectScroll !== directScroll.current) {
      directScroll.current = isDirectScroll;
      shouldAnimate = true;
    }

    prevScrollValue.current = value;
    shouldAnimate && animateAllButtons();
  };

  useEffect(() => {
    scrollY?.addListener(handleScrollY);
    return () => scrollY?.removeAllListeners();
  }, []);

  const viewStyle: StyleProp<ViewStyle> = {position: 'absolute', bottom: 0, right: 0};

  return (
    <>
      <Box zIndex="100" position="absolute" bottom="8px" right="8px">
        {mainButtons.current.map((button, index) => (
          <Animated.View key={index} style={[{translateY: mainPositionValues[index].current}, viewStyle]}>
            <CornerManagementButton button={button} />
          </Animated.View>
        ))}
      </Box>
      <Box zIndex="100" position="absolute" bottom="8px" right="68px">
        {addButtons.current.map((button, index) => (
          <Animated.View key={index} style={[{translateY: additionalPositionValues[index].current}, viewStyle]}>
            <CornerManagementButton button={button} />
          </Animated.View>
        ))}
      </Box>
    </>
  );
};

export default memo(CornerManagement);
