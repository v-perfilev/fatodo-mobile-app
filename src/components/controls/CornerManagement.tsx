import {Badge, Box} from 'native-base';
import {Animated, StyleProp, ViewStyle} from 'react-native';
import {CornerButton} from '../../models/CornerManagement';
import React, {memo, RefObject, useEffect, useRef, useState} from 'react';
import IconButton from './IconButton';
import {SharedValue, useSharedValue} from 'react-native-reanimated';
import CompositeAnimation = Animated.CompositeAnimation;

type CornerManagementProps = {
  buttons: CornerButton[];
  scrollY?: Animated.Value;
  bottomPadding?: number;
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

const CornerManagementButton = ({button}: {button: CornerButton}) => {
  return (
    <Box position="relative">
      {button.badgeNumber > 0 && (
        <Badge
          rounded="full"
          variant="solid"
          colorScheme="secondary"
          position="absolute"
          right="35px"
          bottom="-5px"
          zIndex={1}
        >
          {button.badgeNumber}
        </Badge>
      )}
      <IconButton
        icon={button.icon}
        colorScheme={button.color}
        onPressIn={button.action}
        size="xl"
        variant="solid"
        p="3"
      />
    </Box>
  );
};

const CornerManagement = ({buttons, scrollY, bottomPadding}: CornerManagementProps) => {
  const [mainButtons, setMainButtons] = useState<CornerButton[]>(buttons.filter((b) => !b.additionalColumn));
  const [addButtons, setAddButtons] = useState<CornerButton[]>(buttons.filter((b) => b.additionalColumn));
  const maxButtonsLength = useRef<number>(Math.max(mainButtons.length, addButtons.length));
  const mainButtonPositions = useSharedValue<number[]>(calculatePositions(mainButtons, maxButtonsLength.current));
  const additionalButtonPositions = useSharedValue<number[]>(calculatePositions(addButtons, maxButtonsLength.current));
  const mainPositionValues = createAnimatedValues(mainButtonPositions.value);
  const additionalPositionValues = createAnimatedValues(additionalButtonPositions.value);
  const onTop = useRef<boolean>(true);
  const directScroll = useRef<boolean>(true);
  const prevScrollValue = useRef<number>(0);

  const animateButtons = (
    buttons: CornerButton[],
    positions: SharedValue<number[]>,
    positionValues: RefObject<Animated.Value>[],
    duration?: number,
  ): void => {
    const newPositions = calculatePositions(buttons, maxButtonsLength.current, onTop.current, directScroll.current);
    if (JSON.stringify(positions.value) !== JSON.stringify(newPositions)) {
      positions.value = newPositions;
      const createTiming = (position: number, index: number): CompositeAnimation =>
        Animated.timing(positionValues[index].current, {toValue: position, duration, useNativeDriver: true});
      const animations = newPositions.map((position, index) => createTiming(position, index));
      Animated.parallel(animations).start();
    }
  };

  const animateAllButtons = (duration?: number): void => {
    animateButtons(mainButtons, mainButtonPositions, mainPositionValues, duration);
    animateButtons(addButtons, additionalButtonPositions, additionalPositionValues, duration);
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
    setMainButtons(buttons.filter((b) => !b.additionalColumn));
    setAddButtons(buttons.filter((b) => b.additionalColumn));
  }, [buttons]);

  useEffect(() => {
    animateAllButtons(0);
    const id = scrollY?.addListener(handleScrollY);
    return () => scrollY?.removeListener(id);
  }, [mainButtons, addButtons]);

  const viewStyle: StyleProp<ViewStyle> = {position: 'absolute', bottom: bottomPadding || 0, right: 0};

  return (
    <>
      <Box zIndex="100" position="absolute" bottom="8px" right="8px">
        {mainButtons.map((button, index) => (
          <Animated.View
            style={[{transform: [{translateY: mainPositionValues[index].current}]}, viewStyle]}
            key={index}
          >
            <CornerManagementButton button={button} />
          </Animated.View>
        ))}
      </Box>
      <Box zIndex="100" position="absolute" bottom="8px" right="68px">
        {addButtons.map((button, index) => (
          <Animated.View
            style={[{transform: [{translateY: additionalPositionValues[index].current}]}, viewStyle]}
            key={index}
          >
            <CornerManagementButton button={button} />
          </Animated.View>
        ))}
      </Box>
    </>
  );
};

export default memo(CornerManagement);
