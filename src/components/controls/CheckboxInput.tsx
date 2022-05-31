import React, {FC} from 'react';
import PressableButton from './PressableButton';
import {IPressableProps} from 'native-base/lib/typescript/components/primitives/Pressable/types';
import CheckIcon from '../icons/CheckIcon';
import FCenter from '../boxes/FCenter';

type Props = IPressableProps & {
  isSelected: boolean;
};

const CheckboxInput: FC<Props> = ({isSelected, ...props}: Props) => {
  return (
    <PressableButton {...props}>
      <FCenter w="25px" h="25px" borderWidth="1" borderColor="secondary.500" borderRadius="5">
        {isSelected && <CheckIcon color="primary.500" size="md" />}
      </FCenter>
    </PressableButton>
  );
};

export default CheckboxInput;
