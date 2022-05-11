import React from 'react';
import {Center, Text} from 'native-base';
import {IPressableProps} from 'native-base/lib/typescript/components/primitives/Pressable/types';
import PressableButton from '../../controls/PressableButton';

type PermissionSelectItemProps = IPressableProps & {
  title: string;
  active: boolean;
};

const PermissionSelectItem = ({title, active, onPress}: PermissionSelectItemProps) => {
  return (
    <PressableButton my="1" onPress={onPress}>
      <Center borderColor={active ? 'primary.500' : 'gray.400'} borderWidth="1" borderRadius="5">
        <Text color={active ? 'primary.500' : 'gray.400'}>{title}</Text>
      </Center>
    </PressableButton>
  );
};

export default PermissionSelectItem;
