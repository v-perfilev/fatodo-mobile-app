import React from 'react';
import {Divider, IDividerProps, useColorModeValue} from 'native-base';

type SeparatorProps = IDividerProps;

const Separator = (props: SeparatorProps) => {
  const background = useColorModeValue('gray.100', 'gray.600');
  return <Divider h="1px" bg={background} {...props} />;
};

export default Separator;
