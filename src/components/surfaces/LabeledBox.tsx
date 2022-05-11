import React, {FC, PropsWithChildren} from 'react';
import {HStack, Text} from 'native-base';

type LabeledBoxProps = PropsWithChildren<{
  label: string;
  isText?: boolean;
}>;

const LabeledBox: FC<LabeledBoxProps> = ({label, isText = false, children}: LabeledBoxProps) => {
  const content = isText ? <Text>{children}</Text> : children;

  return (
    <HStack alignItems="center">
      <Text fontWeight="bold" color="gray.500" mr="1">
        {label}:
      </Text>
      {content}
    </HStack>
  );
};

export default LabeledBox;
