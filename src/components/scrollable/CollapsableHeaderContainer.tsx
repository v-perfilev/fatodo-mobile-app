import {Animated, NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleProp, View} from 'react-native';
import React, {MutableRefObject, ReactElement, useRef} from 'react';
import {FlatListType} from './FlatList';
import {HEADER_HEIGHT} from '../../constants';

export type CollapsableHeaderChildrenProps = {
  collapsableRef: MutableRefObject<any>;
  handleEventSnap: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  handleEventScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  handleOffsetScroll: (offset: number) => void;
  scrollY: Animated.Value;
};

type CollapsableHeaderContainerProps = {
  header: ReactElement;
  children: (props: CollapsableHeaderChildrenProps) => ReactElement;
};

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

  translateY.addListener(({value}) => {
    translateYNumber.current = value;
  });

  const handleEventSnap = (event: NativeSyntheticEvent<NativeScrollEvent>): void => {
    if (!(translateYNumber.current === 0 || translateYNumber.current === -HEADER_HEIGHT)) {
      const shouldRemoveOffset = getCloser(translateYNumber.current, -HEADER_HEIGHT, 0) === -HEADER_HEIGHT;
      const offsetY = event.nativeEvent.contentOffset.y;
      const offset = shouldRemoveOffset ? offsetY - translateYNumber.current : offsetY + translateYNumber.current;
      collapsableRef.current?.scrollTo && collapsableRef.current.scrollTo({y: offset});
      collapsableRef.current?.scrollToOffset && collapsableRef.current.scrollToOffset({offset});
    }
  };

  const handleEventScroll = Animated.event([{nativeEvent: {contentOffset: {y: scrollY.current}}}], {
    useNativeDriver: true,
  });

  const handleOffsetScroll = (offset: number): void => {
    scrollY.current.setValue(Math.max(0, offset));
  };

  const safeAreaStyle = {flex: 1};
  const headerStyle: StyleProp<any> = {zIndex: 1, position: 'absolute', width: '100%'};
  const animatedHeaderStyle = {transform: [{translateY}]};

  const childrenProps: CollapsableHeaderChildrenProps = {
    collapsableRef,
    handleEventSnap,
    handleEventScroll,
    handleOffsetScroll,
    scrollY: scrollY.current,
  };

  return (
    <View style={safeAreaStyle}>
      <Animated.View style={[headerStyle, animatedHeaderStyle]}>{header}</Animated.View>
      {children(childrenProps)}
    </View>
  );
};

export default CollapsableHeaderContainer;
