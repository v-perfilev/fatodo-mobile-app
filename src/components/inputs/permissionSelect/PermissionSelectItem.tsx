import React from 'react';
import {Text} from 'native-base';
import {IPressableProps} from 'native-base/lib/typescript/components/primitives/Pressable/types';
import PressableButton from '../../controls/PressableButton';
import FCenter from '../../surfaces/FCenter';

type PermissionSelectItemProps = IPressableProps & {
  title: string;
  active: boolean;
};

const PermissionSelectItem = ({title, active, onPress}: PermissionSelectItemProps) => {
  return (
    <PressableButton onPress={onPress}>
      <FCenter borderColor={active ? 'primary.500' : 'gray.400'} borderWidth="1" borderRadius="5">
        <Text color={active ? 'primary.500' : 'gray.400'}>{title}</Text>
      </FCenter>
    </PressableButton>
  );
};

export default PermissionSelectItem;
