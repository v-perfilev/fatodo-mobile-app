import {Animated, Easing, NativeScrollEvent, NativeSyntheticEvent, StyleProp} from 'react-native';
import React, {memo, MutableRefObject, ReactElement, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {NativeViewGestureHandler, PanGestureHandler} from 'react-native-gesture-handler';
import {GestureEvent} from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlerCommon';
import {MAX_REFRESH_HEIGHT, REFRESH_HEIGHT} from '../../../constants';
import Refresher from '../Refresher';

export type RefreshableContainerChildrenProps = {
  refresher: ReactElement;
  handleEventScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  refreshableRef?: MutableRefObject<any>;
  panRef?: MutableRefObject<any>;
};

type RefreshableContainerProps = {
  refresh?: () => Promise<void>;
  parentScrollY?: Animated.Value;
  inverted?: boolean;
  withGestureHandler?: boolean;
  children: (props: RefreshableContainerChildrenProps) => ReactElement;
};

const RefreshableContainer = ({
  refresh,
  parentScrollY,
  inverted,
  withGestureHandler,
  children,
}: RefreshableContainerProps) => {
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
  const extraScrollValue = useRef<number>(undefined);

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
    if (overscrollEnabled.current === false || scrollYValue.current > 0) {
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
    if (overscrollInitValue.current && shouldRefresh.current) {
      halfCloseLoader();
      colorizeRefresher();
      requestAnimationFrame(() => {
        setRefreshGesturesAllowed(false);
        refresh().finally(() => {
          grayscaleRefresher();
          closeLoader();
          setTimeout(() => setRefreshGesturesAllowed(true), 1000);
        });
      });
    } else if (extraScrollValue.current > 0) {
      closeLoader();
    }

    overscrollInitValue.current = undefined;
    shouldRefresh.current = false;
    overscrollEnabled.current = false;
  }, []);

  useEffect(() => {
    parentScrollY?.addListener(({value}) => (scrollYValue.current = value));
    return () => parentScrollY?.removeAllListeners();
  }, []);

  useEffect(() => {
    scrollY.current?.addListener(({value}) => (scrollYValue.current = value));
    return () => scrollY.current?.removeAllListeners();
  }, []);

  useEffect(() => {
    extraScrollY.current?.addListener(({value}) => (extraScrollValue.current = value));
    return () => scrollY.current?.removeAllListeners();
  }, []);

  useEffect(() => {
    setRefreshGesturesAllowed(!!refresh);
  }, [refresh]);

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

  const childrenProps: RefreshableContainerChildrenProps = {
    refresher,
    handleEventScroll,
    refreshableRef: nativeRef,
    panRef,
  };

  const containerStyle: StyleProp<any> = {
    display: 'flex',
    flexGrow: 1,
    marginTop: inverted ? -REFRESH_HEIGHT : undefined,
    marginBottom: !inverted ? -REFRESH_HEIGHT : undefined,
  };

  const animatedContainerStyle = {transform: [{translateY}]};

  const childrenWithProps = useMemo<ReactElement>(
    () => children(childrenProps),
    [children, refresher, handleEventScroll],
  );

  const animatedElement = (content: ReactElement): ReactElement => (
    <Animated.View style={[containerStyle, animatedContainerStyle]}>{content}</Animated.View>
  );

  const nativeGestureHandlerElement = (content: ReactElement): ReactElement => (
    <NativeViewGestureHandler simultaneousHandlers={panRef} ref={nativeRef}>
      {content}
    </NativeViewGestureHandler>
  );

  const panGestureHandlerElement = (content: ReactElement): ReactElement => (
    <PanGestureHandler
      onBegan={refreshGesturesAllowed ? handleGestureBegan : undefined}
      onGestureEvent={refreshGesturesAllowed ? handleGestureEvent : undefined}
      onEnded={refreshGesturesAllowed ? handleGestureEnded : undefined}
      activeOffsetY={[-15, 15]}
      simultaneousHandlers={nativeRef}
      ref={panRef}
    >
      {content}
    </PanGestureHandler>
  );

  return withGestureHandler
    ? animatedElement(panGestureHandlerElement(childrenWithProps))
    : panGestureHandlerElement(animatedElement(nativeGestureHandlerElement(childrenWithProps)));
};

export default memo(RefreshableContainer);
