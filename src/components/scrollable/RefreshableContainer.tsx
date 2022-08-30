import {Animated, Easing, NativeScrollEvent, NativeSyntheticEvent, ScrollView} from 'react-native';
import React, {memo, MutableRefObject, ReactElement, useEffect, useRef} from 'react';
import {FlatListType} from './FlatList';
import {NativeViewGestureHandler, PanGestureHandler} from 'react-native-gesture-handler';
import {GestureEvent} from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlerCommon';
import {useSharedValue} from 'react-native-reanimated';
import {MAX_REFRESH_HEIGHT} from '../../constants';
import {useDelayedState} from '../../shared/hooks/useDelayedState';

export type RefreshableChildrenProps = {
  refreshableRef: MutableRefObject<any>;
  handleEventScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  extraScrollY: Animated.Value;
  refreshing: boolean;
};

type RefreshableContainerProps = {
  refresh?: () => Promise<void>;
  parentScrollY?: Animated.Value;
  inverted?: boolean;
  children: (props: RefreshableChildrenProps) => ReactElement;
};

const RefreshableContainer = ({refresh, parentScrollY, inverted, children}: RefreshableContainerProps) => {
  const [refreshing, setRefreshing] = useDelayedState(false);

  const panRef = useRef();
  const nativeRef = useRef();
  const refreshableRef = useRef<FlatListType & ScrollView>();
  const scrollY = useRef<Animated.Value>(new Animated.Value(0));
  const extraScrollY = useRef<Animated.Value>(new Animated.Value(0));

  const shouldRefresh = useSharedValue<boolean>(false);
  const scrollYValue = useSharedValue<number>(0);
  const overscrollInitValue = useSharedValue<number>(undefined);

  /*
  scrollY handlers
   */

  const handleEventScroll = Animated.event([{nativeEvent: {contentOffset: {y: scrollY.current}}}], {
    useNativeDriver: true,
  });

  /*
   refresh event handlers
   */

  const closeLoader = (): void => {
    Animated.timing(extraScrollY.current, {
      toValue: 0,
      duration: 400,
      easing: Easing.elastic(1.3),
      useNativeDriver: false,
    }).start();
  };

  const handleGestureEvent = (event: GestureEvent<any>) => {
    const translationY = inverted ? -event.nativeEvent.translationY : event.nativeEvent.translationY;
    if (!overscrollInitValue.value && scrollYValue.value === 0) {
      overscrollInitValue.value = translationY;
    } else if (!!overscrollInitValue.value && scrollYValue.value !== 0) {
      overscrollInitValue.value = undefined;
      extraScrollY.current.setValue(0);
    } else if (overscrollInitValue.value > 0) {
      const extraScroll = translationY - overscrollInitValue.value;
      if (extraScroll > MAX_REFRESH_HEIGHT) {
        extraScrollY.current.setValue(MAX_REFRESH_HEIGHT);
        overscrollInitValue.value = translationY - MAX_REFRESH_HEIGHT;
        shouldRefresh.value = true;
      } else {
        extraScrollY.current.setValue(extraScroll);
        shouldRefresh.value = false;
      }
    }
  };

  const handleGestureEnded = (): void => {
    if (overscrollInitValue.value) {
      if (!shouldRefresh.value) {
        closeLoader();
      } else {
        setRefreshing(true);
        refresh().finally(() => setRefreshing(false));
      }
      overscrollInitValue.value = undefined;
      shouldRefresh.value = false;
    }
  };

  useEffect(() => {
    parentScrollY?.addListener(({value}) => scrollY.current.setValue(value));
    return () => parentScrollY?.removeAllListeners();
  }, [parentScrollY]);

  useEffect(() => {
    scrollY.current?.addListener(({value}) => (scrollYValue.value = value));
    return () => scrollY.current?.removeAllListeners();
  }, [scrollY.current]);

  useEffect(() => {
    !refreshing && closeLoader();
  }, [refreshing]);

  const refreshGesturesAllowed = refresh && !refreshing;

  const childrenProps: RefreshableChildrenProps = {
    refreshableRef,
    handleEventScroll,
    extraScrollY: extraScrollY.current,
    refreshing,
  };

  return (
    <PanGestureHandler
      onGestureEvent={refreshGesturesAllowed ? handleGestureEvent : undefined}
      onEnded={refreshGesturesAllowed ? handleGestureEnded : undefined}
      ref={panRef}
      simultaneousHandlers={nativeRef}
      activeOffsetY={[-10, 10]}
    >
      <NativeViewGestureHandler ref={nativeRef} simultaneousHandlers={panRef}>
        {children(childrenProps)}
      </NativeViewGestureHandler>
    </PanGestureHandler>
  );
};

export default memo(RefreshableContainer);
