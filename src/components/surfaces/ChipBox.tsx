import React from 'react';
import PaperBox from './PaperBox';
import {IBoxProps, Text, useColorModeValue} from 'native-base';
import CloseIcon from '../icons/CloseIcon';
import IconButton from '../controls/IconButton';

type ChipBoxProps = IBoxProps & {
  closeAction?: () => void;
};

const ChipBox = ({children, closeAction, ...props}: ChipBoxProps) => {
  const chipBg = useColorModeValue('gray.100', 'gray.700');

  return (
    <PaperBox {...props} bg={chipBg} px="2" py="1" borderRadius="xl" borderWidth="0" flexDir="row" alignItems="center">
      <Text fontWeight="bold" fontSize="sm">
        {children}
      </Text>
      {closeAction && <IconButton icon={<CloseIcon />} size="sm" p="1" ml="1" onPress={closeAction} />}
    </PaperBox>
  );
};

export default ChipBox;
