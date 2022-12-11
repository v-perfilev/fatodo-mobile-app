import React, {memo, ReactElement, useEffect, useRef, useState} from 'react';
import {Box, ITextProps, Text} from 'native-base';
import {useTranslation} from 'react-i18next';
import FHStack from '../boxes/FHStack';
import FVStack from '../boxes/FVStack';
import FBox from '../boxes/FBox';
import {LayoutChangeEvent} from 'react-native';

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
  const [labelWidth, setLabelWidth] = useState<number>(0);
  const widthMap = useRef<Map<number, number>>(new Map());

  const filteredItems = items.filter((i) => i.value || i.showNotSet);

  const updateLabelWidth = (): void => {
    const widths = Array.from(widthMap.current.values());
    const maxLabelWidth = Math.max(...widths) + 18;
    maxLabelWidth > labelWidth && setLabelWidth(maxLabelWidth);
  };

  const handleLabelLayout =
    (index: number) =>
    (e: LayoutChangeEvent): void => {
      if (!widthMap.current.has(index)) {
        const width = e.nativeEvent.layout.width;
        widthMap.current.set(index, width);
        widthMap.current.size === filteredItems.length && updateLabelWidth();
      }
    };

  useEffect(() => {
    widthMap.current.clear();
  }, [items]);

  return (
    <FVStack space="3">
      {filteredItems.map((item, index) => (
        <FHStack key={index}>
          <Box width={labelWidth !== 0 ? labelWidth : undefined}>
            <MultiLabeledBoxLabel label={item.label} onLayout={handleLabelLayout(index)} {...props} />
          </Box>
          {labelWidth !== 0 && <MultiLabeledBoxValue value={item.value} showNotSet={item.showNotSet} {...props} />}
        </FHStack>
      ))}
    </FVStack>
  );
};

export default memo(MultiLabeledBox);
