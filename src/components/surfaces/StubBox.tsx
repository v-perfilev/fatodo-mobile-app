import React from 'react';
import {Box, IBoxProps, Text} from 'native-base';
import FCenter from '../boxes/FCenter';
import {StyleProp, ViewStyle} from 'react-native';

type StubBoxProps = IBoxProps & {
  inverted?: boolean;
};

const StubBox = ({inverted, children, ...props}: StubBoxProps) => {
  const containerStyle: StyleProp<ViewStyle> = {transform: [{scaleY: inverted ? -1 : 1}]};
  return (
    <FCenter style={containerStyle} grow {...props}>
      <Box maxWidth="60%">
        <Text fontSize="md" fontWeight="bold" color="gray.400" textAlign="center">
          {children}
        </Text>
      </Box>
    </FCenter>
  );
};

export default StubBox;
