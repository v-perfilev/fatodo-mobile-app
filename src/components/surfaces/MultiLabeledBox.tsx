import React, {ReactElement} from 'react';
import {ITextProps, Text} from 'native-base';
import {useTranslation} from 'react-i18next';
import FHStack from '../boxes/FHStack';
import FVStack from '../boxes/FVStack';
import FBox from '../boxes/FBox';

export type MultiLabeledBoxItem = {
  label: string;
  value: string | ReactElement;
  showNotSet?: boolean;
};

type MultiLabeledBoxLabelProps = ITextProps & {
  label: string;
};

type MultiLabeledBoxValueProps = ITextProps & {
  value: string | ReactElement;
  showNotSet?: boolean;
};

type MultiLabeledBoxProps = ITextProps & {
  items: MultiLabeledBoxItem[];
};

const MultiLabeledBoxLabel = ({label, ...props}: MultiLabeledBoxLabelProps) => {
  return (
    <FBox grow={false}>
      <Text {...props} fontWeight="bold" color="gray.500" mr="1">
        {label}:
      </Text>
    </FBox>
  );
};

const MultiLabeledBoxValue = ({value, showNotSet, ...props}: MultiLabeledBoxValueProps) => {
  const {t} = useTranslation();
  const handledChildren = showNotSet ? value || t('additional.fieldNotSet') : value;

  const content =
    typeof handledChildren === 'string' ? (
      <Text {...props} color={!value && showNotSet ? 'gray.500' : undefined}>
        {handledChildren}
      </Text>
    ) : (
      handledChildren
    );

  return <FBox>{content}</FBox>;
};

const MultiLabeledBox = ({items, ...props}: MultiLabeledBoxProps) => {
  const filteredItems = items.filter((i) => i.value || i.showNotSet);

  return (
    <FHStack defaultSpace>
      <FVStack defaultSpace>
        {filteredItems.map((item, index) => (
          <MultiLabeledBoxLabel label={item.label} key={index} {...props} />
        ))}
      </FVStack>
      <FVStack defaultSpace>
        {filteredItems.map((item, index) => (
          <MultiLabeledBoxValue value={item.value} showNotSet={item.showNotSet} key={index} {...props} />
        ))}
      </FVStack>
    </FHStack>
  );
};

export default MultiLabeledBox;
