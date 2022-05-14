import React, {ReactElement, useState} from 'react';
import {Box, Flex, FormControl, IFormControlProps} from 'native-base';
import {FormikProps} from 'formik';
import PaperBox from '../surfaces/PaperBox';
import {ArrayUtils} from '../../shared/utils/ArrayUtils';
import ChipBox from '../surfaces/ChipBox';
import PressableButton from '../controls/PressableButton';

type FormikChipsProps<T> = IFormControlProps &
  FormikProps<any> & {
    name: string;
    label?: string;
    view: (value: T) => ReactElement;
    input: (addValue: (value: T) => void, close: () => void) => ReactElement;
  };

const FormikChips = (props: FormikChipsProps<any>) => {
  const {name, label, view, input} = props;
  const {values, setFieldValue} = props;
  const [showInput, setShowInput] = useState<boolean>(false);

  const arrayValue = values[name] as any[];

  const openInput = (): void => setShowInput(true);
  const closeInput = (): void => setShowInput(false);

  const addValue = (value: any): void => {
    if (value && !arrayValue.includes(value)) {
      const array = ArrayUtils.addItem(arrayValue, value);
      setFieldValue(name, array);
    }
  };

  const deleteValue = (index: number) => (): void => {
    const array = ArrayUtils.deleteItemByIndex(arrayValue, index);
    setFieldValue(name, array);
  };

  const chipsElements = arrayValue.map((value, index) => (
    <Box mr="1.5" mb="1.5" key={index}>
      <ChipBox h="30" closeAction={deleteValue(index)}>
        {view(value)}
      </ChipBox>
    </Box>
  ));

  return (
    <FormControl {...props}>
      {label && <FormControl.Label>{label}</FormControl.Label>}

      <PressableButton onPress={openInput}>
        <PaperBox flexDir="row" minH="45px" alignItems="center" px="3" py="2">
          <Flex mb="-1.5" flexDirection="row" flexWrap="wrap">
            {chipsElements}
            {showInput && input(addValue, closeInput)}
          </Flex>
        </PaperBox>
      </PressableButton>
    </FormControl>
  );
};

export default FormikChips;
