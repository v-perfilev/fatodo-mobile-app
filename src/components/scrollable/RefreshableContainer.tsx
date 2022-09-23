import {Animated, Easing, NativeScrollEvent, NativeSyntheticEvent, StyleProp} from 'react-native';
import React, {memo, ReactElement, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {NativeViewGestureHandler, PanGestureHandler} from 'react-native-gesture-handler';
import {GestureEvent} from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlerCommon';
import {MAX_REFRESH_HEIGHT, REFRESH_HEIGHT} from '../../constants';
import Refresher from './Refresher';

export type RefreshableChildrenProps = {
  refresher: ReactElement;
  handleEventScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
};

type RefreshableContainerProps = {
  refresh?: () => Promise<void>;
  parentScrollY?: Animated.Value;
  inverted?: boolean;
  children: (props: RefreshableChildrenProps) => ReactElement;
};

const RefreshableContainer = ({refresh, parentScrollY, inverted, children}: RefreshableContainerProps) => {
  const [refreshGesturesAllowed, setRefreshGesturesAllowed] = useState<boolean>(!!refresh);

  const panRef = useRef();
  const nativeRef = useRef();
  const scrollY = useRef<Animated.Value>(new Animated.Value(0));
  const extraScrollY = useRef<Animated.Value>(new Animated.Value(0));
  const refreshing = useRef<Animated.Value>(new Animated.Value(0));

  const shouldRefresh = useRef<boolean>(false);
  const scrollYValue = useRef<number>(0);
  const overscrollEnabled = useRef<boolean>(true);
  const overscrollInitValue = useRef<number>(undefined);

  const translateY = extraScrollY.current.interpolate({
    inputRange: [0, MAX_REFRESH_HEIGHT],
    outputRange: [inverted ? REFRESH_HEIGHT : -REFRESH_HEIGHT, 0],
    extrapolate: 'clamp',
  });

  /*
  scrollY handlers
   */

  const handleEventScroll = useCallback(
    Animated.event([{nativeEvent: {contentOffset: {y: scrollY.current}}}], {
      useNativeDriver: true,
    }),
    [],
  );

  /*
   refresh event handlers
   */

  const halfCloseLoader = useCallback((): void => {
    Animated.timing(extraScrollY.current, {
      toValue: REFRESH_HEIGHT,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, []);

  const closeLoader = useCallback((): void => {
    Animated.timing(extraScrollY.current, {
      toValue: 0,
      duration: 1000,
      easing: Easing.elastic(1.3),
      useNativeDriver: true,
    }).start();
  }, []);

  const colorizeRefresher = useCallback((): void => {
    Animated.timing(refreshing.current, {toValue: 1, useNativeDriver: true}).start();
  }, []);

  const grayscaleRefresher = useCallback((): void => {
    Animated.timing(refreshing.current, {toValue: 0, useNativeDriver: true}).start();
  }, []);

  const handleGestureBegan = useCallback((): void => {
    if (scrollYValue.current <= 0) {
      overscrollEnabled.current = true;
    }
  }, []);

  const handleGestureEvent = useCallback((event: GestureEvent<any>) => {
    if (scrollYValue.current > 0) {
      overscrollInitValue.current = undefined;
      overscrollEnabled.current = false;
      return;
    }
    const translationY = inverted ? -event.nativeEvent.translationY : event.nativeEvent.translationY;
    if (overscrollInitValue.current) {
      const extraScroll = translationY - overscrollInitValue.current;
      if (extraScroll > MAX_REFRESH_HEIGHT) {
        overscrollInitValue.current = translationY - MAX_REFRESH_HEIGHT;
      }
      if (extraScroll >= 0) {
        extraScrollY.current.setValue(Math.min(extraScroll, MAX_REFRESH_HEIGHT));
      }
      shouldRefresh.current = extraScroll > REFRESH_HEIGHT;
    }
    if (overscrollEnabled.current && !overscrollInitValue.current) {
      overscrollInitValue.current = translationY;
    }
  }, []);

  const handleGestureEnded = useCallback((): void => {
    overscrollEnabled.current = false;

    if (overscrollInitValue.current) {
      if (!shouldRefresh.current) {
        closeLoader();
      } else {
        halfCloseLoader();
        colorizeRefresher();
        requestAnimationFrame(() => {
          setRefreshGesturesAllowed(false);
          refresh().finally(() => {
            setTimeout(() => closeLoader(), 500);
            setTimeout(() => setRefreshGesturesAllowed(true), 500);
            setTimeout(() => grayscaleRefresher(), 1500);
          });
        });
      }
      overscrollInitValue.current = undefined;
      shouldRefresh.current = false;
    }
  }, []);

  useEffect(() => {
    parentScrollY?.addListener(({value}) => scrollY.current.setValue(value));
    return () => parentScrollY?.removeAllListeners();
  }, []);

  useEffect(() => {
    scrollY.current?.addListener(({value}) => (scrollYValue.current = value));
    return () => scrollY.current?.removeAllListeners();
  }, []);

  const refresher = useMemo<ReactElement>(
    () => (
      <Refresher
        refreshing={refreshing.current}
        extraScrollY={extraScrollY.current}
        pt={!inverted ? MAX_REFRESH_HEIGHT - REFRESH_HEIGHT : undefined}
        pb={inverted ? MAX_REFRESH_HEIGHT - REFRESH_HEIGHT : undefined}
      />
    ),
    [],
  );

  const childrenWithProps = useMemo<ReactElement>(
    () => children({refresher, handleEventScroll}),
    [children, refresher, handleEventScroll],
  );

  const containerStyle: StyleProp<any> = {
    display: 'flex',
    flexGrow: 1,
    marginTop: inverted ? -REFRESH_HEIGHT : undefined,
    marginBottom: !inverted ? -REFRESH_HEIGHT : undefined,
  };
  const animatedContainerStyle = {transform: [{translateY}]};

  return (
    <Animated.View style={[containerStyle, animatedContainerStyle]}>
      <PanGestureHandler
        onBegan={refreshGesturesAllowed ? handleGestureBegan : undefined}
        onGestureEvent={refreshGesturesAllowed ? handleGestureEvent : undefined}
        onEnded={refreshGesturesAllowed ? handleGestureEnded : undefined}
        activeOffsetY={[-15, 15]}
        simultaneousHandlers={nativeRef}
        ref={panRef}
      >
        <NativeViewGestureHandler simultaneousHandlers={panRef} ref={nativeRef}>
          {childrenWithProps}
        </NativeViewGestureHandler>
      </PanGestureHandler>
    </Animated.View>
  );
};

export default memo(RefreshableContainer);
