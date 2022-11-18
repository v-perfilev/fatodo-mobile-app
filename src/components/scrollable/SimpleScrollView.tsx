import {IScrollViewProps} from 'native-base';
import React from 'react';
import {Animated, StyleProp, ViewStyle} from 'react-native';

type SimpleScrollViewProps = IScrollViewProps & {
  containerStyle?: StyleProp<ViewStyle>;
};

const flexStyle: StyleProp<ViewStyle> = {flexGrow: 1, paddingHorizontal: 12, paddingTop: 6, paddingBottom: 18};

const SimpleScrollView = ({containerStyle, children, ...props}: SimpleScrollViewProps) => {
  return (
    <Animated.ScrollView
      contentContainerStyle={[flexStyle, containerStyle]}
      keyboardShouldPersistTaps="handled"
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      bounces={false}
      {...props}
    >
      {children}
    </Animated.ScrollView>
  );
};

export default SimpleScrollView;
