import React from 'react';
import PaperBox from './PaperBox';
import {IBoxProps, Icon, Text} from 'native-base';
import CloseIcon from '../icons/CloseIcon';

type ChipBoxProps = IBoxProps & {
  closeAction?: () => void;
};

const ChipBox = ({children, closeAction, ...props}: ChipBoxProps) => {
  return (
    <PaperBox {...props} bg="gray.100" flexDir="row" alignItems="center">
      <Text fontSize="12" fontWeight="bold" color="gray.500">
        {children}
      </Text>
      {closeAction && <Icon as={<CloseIcon />} size="4" ml="1" onPress={closeAction} />}
    </PaperBox>
  );
};

export default ChipBox;
