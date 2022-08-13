import {Animated, NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleProp, View} from 'react-native';
import React, {ReactElement, RefObject, useRef} from 'react';
import {FlatListType} from '../surfaces/FlatList';
import {HEADER_HEIGHT} from '../../constants';

export type CollapsableHeaderChildrenProps = {
  scrollViewRef: RefObject<ScrollView>;
  flatListRef: RefObject<FlatListType>;
  handleEventSnap: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  handleEventScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  handleOffsetScroll: (offset: number) => void;
};

type CollapsableHeaderContainerProps = {
  header: ReactElement;
  children: (props: CollapsableHeaderChildrenProps) => ReactElement;
};

const getCloser = (value: number, checkOne: number, checkTwo: number): number =>
  Math.abs(value - checkOne) < Math.abs(value - checkTwo) ? checkOne : checkTwo;

const CollapsableHeaderContainer = ({header, children}: CollapsableHeaderContainerProps) => {
  const scrollViewRef = useRef<ScrollView>();
  const flatListRef = useRef<FlatListType>();
  const scrollY = useRef<Animated.Value>(new Animated.Value(0));
  const translateYNumber = useRef<number>();

  const scrollYClamped = Animated.diffClamp(scrollY.current, 0, HEADER_HEIGHT);

  const translateY = scrollYClamped.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
  });

  translateY.addListener(({value}) => {
    translateYNumber.current = value;
  });

  const handleSnapWithFunc = (offsetY: number, func: (offset: number) => void): void => {
    if (!(translateYNumber.current === 0 || translateYNumber.current === -HEADER_HEIGHT)) {
      const shouldAddOffset = getCloser(translateYNumber.current, -HEADER_HEIGHT, 0) === -HEADER_HEIGHT;
      const offset = shouldAddOffset ? offsetY + HEADER_HEIGHT : offsetY - HEADER_HEIGHT;
      func(offset);
    }
  };

  const handleEventSnap = ({nativeEvent}: NativeSyntheticEvent<NativeScrollEvent>): void => {
    const offsetY = nativeEvent.contentOffset.y;
    const scrollViewFunc = (y: number): void => scrollViewRef.current.scrollTo({y});
    const flatListFunc = (offset: number): void => flatListRef.current.scrollToOffset({offset});
    scrollViewRef.current && handleSnapWithFunc(offsetY, scrollViewFunc);
    flatListRef.current && handleSnapWithFunc(offsetY, flatListFunc);
  };

  const handleEventScroll = Animated.event([{nativeEvent: {contentOffset: {y: scrollY.current}}}], {
    useNativeDriver: false,
  });

  const handleOffsetScroll = (offset: number): void => scrollY.current.setValue(Math.max(0, offset));

  const safeAreaStyle = {flex: 1};
  const headerStyle: StyleProp<any> = {zIndex: 1, position: 'absolute', width: '100%'};
  const animatedHeaderStyle = {transform: [{translateY}]};

  const childrenProps: CollapsableHeaderChildrenProps = {
    scrollViewRef,
    flatListRef,
    handleEventSnap,
    handleEventScroll,
    handleOffsetScroll,
  };

  return (
    <View style={safeAreaStyle}>
      <Animated.View style={[headerStyle, animatedHeaderStyle]}>{header}</Animated.View>
      {children(childrenProps)}
    </View>
  );
};

export default CollapsableHeaderContainer;
