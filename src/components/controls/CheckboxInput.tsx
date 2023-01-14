import React from 'react';
import PressableButton from './PressableButton';
import {IPressableProps} from 'native-base/lib/typescript/components/primitives/Pressable/types';
import CheckIcon from '../icons/CheckIcon';
import FCenter from '../boxes/FCenter';

type CheckboxInputProps = IPressableProps & {
  isSelected: boolean;
  size?: number;
};

const CheckboxInput = ({isSelected, size = 25, ...props}: CheckboxInputProps) => {
  return (
    <PressableButton {...props}>
      <FCenter w={`${size}px`} h={`${size}px`} borderWidth="1" borderColor="secondary.500" borderRadius="5">
        {isSelected && <CheckIcon color="primary.500" size={`${size}px`} />}
      </FCenter>
    </PressableButton>
  );
};

export default CheckboxInput;
