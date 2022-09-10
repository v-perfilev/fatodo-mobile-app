import React from 'react';
import {Divider, IDividerProps} from 'native-base';

type SeparatorProps = IDividerProps;

const Separator = (props: SeparatorProps) => {
  return <Divider h="1px" bgColor="gray.100" {...props} />;
};

export default Separator;
