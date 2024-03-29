import {Animated, NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleProp, ViewStyle} from 'react-native';
import React, {memo, MutableRefObject, ReactElement, useCallback, useEffect, useMemo, useRef} from 'react';
import {FlatListType} from '../FlatList';
import {HEADER_HEIGHT} from '../../../constants';

export type CollapsableHeaderContainerChildrenProps = {
  collapsableRef: MutableRefObject<any>;
  handleEventSnap: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  handleEventScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  scrollY: Animated.Value;
};

type CollapsableHeaderContainerProps = {
  header?: ReactElement;
  children: (props: CollapsableHeaderContainerChildrenProps) => ReactElement;
};

const headerStyle: StyleProp<ViewStyle> = {zIndex: 1, position: 'absolute', width: '100%'};

const getCloser = (value: number, checkOne: number, checkTwo: number): number =>
  Math.abs(value - checkOne) < Math.abs(value - checkTwo) ? checkOne : checkTwo;

const CollapsableHeaderContainer = ({header, children}: CollapsableHeaderContainerProps) => {
  const collapsableRef = useRef<FlatListType & ScrollView>();
  const scrollY = useRef<Animated.Value>(new Animated.Value(0));
  const translateYNumber = useRef<number>();

  const clampedScrollY = scrollY.current.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
    extrapolateLeft: 'extend',
    extrapolateRight: 'extend',
  });

  const diffClampScrollY = Animated.diffClamp(clampedScrollY, 0, HEADER_HEIGHT);

  const translateY = diffClampScrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
  });

  const handleEventSnap = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>): void => {
      if (!(translateYNumber.current === 0 || translateYNumber.current === -HEADER_HEIGHT)) {
        const shouldRemoveOffset = getCloser(translateYNumber.current, -HEADER_HEIGHT, 0) === -HEADER_HEIGHT;
        const offsetY = event.nativeEvent.contentOffset.y;
        const offset = shouldRemoveOffset ? offsetY - translateYNumber.current : offsetY + translateYNumber.current;
        collapsableRef.current?.scrollTo && collapsableRef.current.scrollTo({y: offset});
        collapsableRef.current?.scrollToOffset && collapsableRef.current.scrollToOffset({offset});
      }
    },
    [translateYNumber.current, collapsableRef.current],
  );

  const handleEventScroll = useCallback(
    Animated.event([{nativeEvent: {contentOffset: {y: scrollY.current}}}], {
      useNativeDriver: true,
    }),
    [scrollY.current],
  );

  useEffect(() => {
    const id = translateY.addListener(({value}) => (translateYNumber.current = value));
    return () => translateY.removeListener(id);
  }, [translateY]);

  const animatedHeaderStyle = {transform: [{translateY}]};

  const childrenProps: CollapsableHeaderContainerChildrenProps = {
    collapsableRef,
    handleEventSnap,
    handleEventScroll,
    scrollY: scrollY.current,
  };

  const childWithProps = useMemo<ReactElement>(
    () => children(childrenProps),
    [children, handleEventSnap, handleEventScroll],
  );

  return (
    <>
      {header && <Animated.View style={[headerStyle, animatedHeaderStyle]}>{header}</Animated.View>}
      {childWithProps}
    </>
  );
};

export default memo(CollapsableHeaderContainer);
