import {Animated, Easing, NativeScrollEvent, NativeSyntheticEvent, Platform, StyleProp, ViewStyle} from 'react-native';
import React, {memo, MutableRefObject, ReactElement, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {GestureEvent} from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlerCommon';
import {FLAT_LIST_REFRESH_TIMEOUT, MAX_REFRESH_HEIGHT, REFRESH_HEIGHT} from '../../../constants';
import Refresher from '../Refresher';
import {getSystemVersion} from 'react-native-device-info';

export type RefreshableContainerChildrenProps = {
  refresher: ReactElement;
  handleEventScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  panRef?: MutableRefObject<any>;
};

type RefreshableContainerProps = {
  refresh?: () => Promise<void>;
  parentScrollY?: Animated.Value;
  inverted?: boolean;
  children: (props: RefreshableContainerChildrenProps) => ReactElement;
};

const RefreshableContainer = ({refresh, parentScrollY, inverted, children}: RefreshableContainerProps) => {
  const [enabled, setEnabled] = useState<boolean>(!!refresh);
  const [pausedAfterRefresh, setPausedAfterRefresh] = useState<boolean>(false);

  const panRef = useRef();
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
    outputRange: [0, inverted ? -REFRESH_HEIGHT : REFRESH_HEIGHT],
    extrapolate: 'clamp',
  });

  // WORKAROUND FOR INVERTED LISTS ON ANDROID WITH VERSION >= 11
  const useFixInverted = useMemo(() => {
    return inverted && Platform.OS === 'android' && Number(getSystemVersion()) >= 11;
  }, []);

  // WORKAROUND FOR INVERTED LISTS ON ANDROID WITH VERSION >= 11
  const useRegularInverted = useMemo(() => {
    return inverted && !useFixInverted;
  }, []);

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
        setPausedAfterRefresh(true);
        refresh().finally(() => {
          grayscaleRefresher();
          closeLoader();
          setTimeout(() => setPausedAfterRefresh(false), FLAT_LIST_REFRESH_TIMEOUT);
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
    const parentScrollYId = parentScrollY?.addListener(({value}) => {
      scrollYValue.current = value;
      setEnabled(value === 0);
    });
    const scrollYId = scrollY.current?.addListener(({value}) => {
      scrollYValue.current = value;
      setEnabled(value === 0);
    });
    const extraScrollYId = extraScrollY.current?.addListener(({value}) => (extraScrollValue.current = value));
    return () => {
      parentScrollY?.removeListener(parentScrollYId);
      scrollY.current?.removeListener(scrollYId);
      extraScrollY.current?.removeListener(extraScrollYId);
    };
  }, []);

  useEffect(() => {
    setEnabled(!!refresh);
  }, [refresh]);

  const refresher = useMemo<ReactElement>(
    () => (
      <Refresher
        refreshing={refreshing.current}
        extraScrollY={extraScrollY.current}
        pt={!useRegularInverted ? MAX_REFRESH_HEIGHT - REFRESH_HEIGHT : undefined}
        pb={useRegularInverted ? MAX_REFRESH_HEIGHT - REFRESH_HEIGHT : undefined}
      />
    ),
    [],
  );

  const childrenProps: RefreshableContainerChildrenProps = {
    refresher,
    handleEventScroll,
    panRef,
  };

  const containerStyle: StyleProp<ViewStyle> = {
    flex: 1,
    marginTop: !inverted ? -REFRESH_HEIGHT : undefined,
    marginBottom: inverted ? -REFRESH_HEIGHT : undefined,
  };
  const animatedContainerStyle = {transform: [{translateY}]};

  const childrenWithProps = useMemo<ReactElement>(
    () => children(childrenProps),
    [children, refresher, handleEventScroll],
  );

  const animatedElement = (content: ReactElement): ReactElement => (
    <Animated.View style={[containerStyle, animatedContainerStyle]}>{content}</Animated.View>
  );

  const panGestureHandlerElement = (content: ReactElement): ReactElement => (
    <PanGestureHandler
      enabled={enabled && !pausedAfterRefresh}
      onBegan={handleGestureBegan}
      onGestureEvent={handleGestureEvent}
      onEnded={handleGestureEnded}
      onCancelled={handleGestureEnded}
      activeOffsetY={inverted ? -20 : 10}
      ref={panRef}
    >
      {content}
    </PanGestureHandler>
  );

  return animatedElement(panGestureHandlerElement(childrenWithProps));
};

export default memo(RefreshableContainer);
