import React from 'react';
import {HStack, ITextProps, Text, VStack} from 'native-base';

type LabeledBoxProps = ITextProps & {
  label: string;
  isText?: boolean;
  isVertical?: boolean;
};

const LabeledBox = ({label, isText = false, isVertical = false, children, ...props}: LabeledBoxProps) => {
  const Wrapper = isVertical ? VStack : HStack;
  const content = isText ? <Text {...props}>{children}</Text> : children;
  const alignItems = isVertical ? null : 'center';

  return (
    <Wrapper alignItems={alignItems}>
      <Text {...props} fontWeight="bold" color="gray.500" mr="1">
        {label}:
      </Text>
      {content}
    </Wrapper>
  );
};

export default LabeledBox;
