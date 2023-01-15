import React, {ReactNode} from 'react';
import {useColorModeValue} from 'native-base';
import FVStack from '../boxes/FVStack';

type StartupModalTemplateProps = {
  children: ReactNode;
};

const StartupModalTemplate = ({children}: StartupModalTemplateProps) => {
  const bg = useColorModeValue('gray.50', 'gray.800');
  const borderColor = useColorModeValue('gray.400', 'gray.500');

  return (
    <FVStack space="1" p="5" borderWidth="0.25" borderRadius="lg" borderColor={borderColor} bg={bg}>
      {children}
    </FVStack>
  );
};

export default StartupModalTemplate;
