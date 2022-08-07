import React from 'react';
import {IBoxProps, Text} from 'native-base';
import FCenter from '../boxes/FCenter';

type StubBoxProps = IBoxProps;

const StubBox = ({children, ...props}: StubBoxProps) => {
  return (
    <FCenter grow {...props}>
      <Text fontSize="16" fontWeight="bold" color="gray.500">
        {children}
      </Text>
    </FCenter>
  );
};

export default StubBox;
