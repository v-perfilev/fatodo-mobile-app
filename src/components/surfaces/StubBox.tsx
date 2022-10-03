import React from 'react';
import {IBoxProps, Text} from 'native-base';
import FCenter from '../boxes/FCenter';
import {StyleProp} from 'react-native';

type StubBoxProps = IBoxProps & {
  inverted?: boolean;
};

const StubBox = ({inverted, children, ...props}: StubBoxProps) => {
  const containerStyle: StyleProp<any> = {scaleY: inverted ? -1 : 1};
  return (
    <FCenter style={containerStyle} grow {...props}>
      <Text fontSize="16" fontWeight="bold" color="gray.400">
        {children}
      </Text>
    </FCenter>
  );
};

export default StubBox;
