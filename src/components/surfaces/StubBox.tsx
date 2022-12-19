import React from 'react';
import {IBoxProps} from 'native-base';
import FCenter from '../boxes/FCenter';
import {StyleProp, ViewStyle} from 'react-native';

type StubBoxProps = IBoxProps & {
  inverted?: boolean;
};

const StubBox = ({inverted, children, ...props}: StubBoxProps) => {
  const containerStyle: StyleProp<ViewStyle> = {transform: [{scaleY: inverted ? -1 : 1}]};
  return (
    <FCenter width="100%" style={containerStyle} grow {...props}>
      {children}
    </FCenter>
  );
};

export default StubBox;
