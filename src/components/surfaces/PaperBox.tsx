import React, {FC} from 'react';
import {Box, IBoxProps} from 'native-base';

type PaperBoxProps = IBoxProps;

const PaperBox: FC<PaperBoxProps> = ({children, ...props}) => {
  return (
    <Box px="1" py="0.5" borderWidth="1" borderColor="gray.200" rounded="md" {...props}>
      {children}
    </Box>
  );
};

export default PaperBox;