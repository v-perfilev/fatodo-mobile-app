import React from 'react';
import {HStack, ITextProps, Text, VStack} from 'native-base';
import {useTranslation} from 'react-i18next';

type LabeledBoxProps = ITextProps & {
  label: string;
  isText?: boolean;
  isVertical?: boolean;
  showNotSet?: boolean;
};

const LabeledBox = ({label, isText, isVertical, showNotSet, children, ...props}: LabeledBoxProps) => {
  const {t} = useTranslation();
  const Wrapper = isVertical ? VStack : HStack;
  const handledChildren = showNotSet ? children || t('additional.fieldNotSet') : children;
  const content = isText ? (
    <Text {...props} color={!children && showNotSet ? 'gray.500' : undefined}>
      {handledChildren}
    </Text>
  ) : (
    handledChildren
  );
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
