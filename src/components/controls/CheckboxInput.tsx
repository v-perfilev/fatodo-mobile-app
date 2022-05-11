import React, {FC} from 'react';
import PressableButton from './PressableButton';
import {IPressableProps} from 'native-base/lib/typescript/components/primitives/Pressable/types';
import {Center} from 'native-base';
import CheckIcon from '../icons/CheckIcon';

type Props = IPressableProps & {
  isSelected: boolean;
};

const CheckboxInput: FC<Props> = ({isSelected, ...props}: Props) => {
  return (
    <PressableButton {...props}>
      <Center w="30" h="30" borderWidth="1" borderColor="gray.500" borderRadius="5">
        {isSelected && <CheckIcon color="primary.500" />}
      </Center>
    </PressableButton>
  );
};

export default CheckboxInput;
