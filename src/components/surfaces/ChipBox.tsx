import React, {PropsWithChildren} from 'react';
import PaperBox from './PaperBox';
import {Text} from 'native-base';

type ChipBoxProps = PropsWithChildren<{}>;

const ChipBox = ({children}: ChipBoxProps) => {
  return (
    <PaperBox>
      <Text fontSize="12" fontWeight="bold" color="gray.500">
        {children}
      </Text>
    </PaperBox>
  );
};

export default ChipBox;
