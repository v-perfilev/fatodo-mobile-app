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
      <FCenter w="30px" h="30px" borderWidth="1" borderColor="gray.500" borderRadius="5">
        {isSelected && <CheckIcon color="primary.500" />}
      </FCenter>
    </PressableButton>
  );
};

export default CheckboxInput;
