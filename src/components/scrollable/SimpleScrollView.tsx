import {IScrollViewProps, ScrollView} from 'native-base';
import {DEFAULT_SPACE} from '../../constants';
import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';

type SimpleScrollViewProps = IScrollViewProps & {
  containerStyle?: StyleProp<ViewStyle>;
};

const flexStyle: StyleProp<ViewStyle> = {flexGrow: 1, padding: DEFAULT_SPACE};

const SimpleScrollView = ({containerStyle, children, ...props}: SimpleScrollViewProps) => {
  return (
    <ScrollView contentContainerStyle={[flexStyle, containerStyle]} keyboardShouldPersistTaps="handled" {...props}>
      {children}
    </ScrollView>
  );
};

export default SimpleScrollView;
