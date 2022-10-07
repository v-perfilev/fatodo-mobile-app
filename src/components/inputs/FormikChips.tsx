import React, {ReactElement, useState} from 'react';
import {FormControl, IFormControlProps, useColorModeValue} from 'native-base';
import {FormikProps} from 'formik';
import PaperBox from '../surfaces/PaperBox';
import {ArrayUtils} from '../../shared/utils/ArrayUtils';
import ChipBox from '../surfaces/ChipBox';
import PressableButton from '../controls/PressableButton';
import FContainer from '../boxes/FContainer';

type FormikChipsProps<T> = IFormControlProps &
  FormikProps<any> & {
    name: string;
    label?: string;
    view: (value: T) => ReactElement;
    input: (show: boolean, addValue: (value: T) => void, close: () => void) => ReactElement;
  };

const FormikChips = (props: FormikChipsProps<any>) => {
  const {name, label, view, input} = props;
  const {values, setFieldValue} = props;
  const [showInput, setShowInput] = useState<boolean>(false);

  const arrayValue: any[] = values[name] || [];

  const openInput = (): void => setShowInput(true);
  const closeInput = (): void => setShowInput(false);

  const addValue = (value: any): void => {
    if (value && !arrayValue.includes(value)) {
      const array = [...arrayValue, value];
      setFieldValue(name, array);
    }
  };

  const deleteValue = (index: number) => (): void => {
    const array = ArrayUtils.deleteValueByIndex(arrayValue, index);
    setFieldValue(name, array);
  };

  const chipsElements = arrayValue.map((value, index) => (
    <ChipBox h="30px" closeAction={deleteValue(index)} key={index}>
      {view(value)}
    </ChipBox>
  ));

  const borderColor = useColorModeValue('gray.400', 'gray.600');

  return (
    <FormControl {...props}>
      {label && <FormControl.Label>{label}</FormControl.Label>}
      <PressableButton onPress={openInput}>
        <PaperBox
          flexDir="row"
          minH="45px"
          alignItems="center"
          px="3"
          py="2"
          borderColor={borderColor}
          borderRadius="xl"
        >
          <FContainer itemM="1">
            {chipsElements}
            {input(showInput, addValue, closeInput)}
          </FContainer>
        </PaperBox>
      </PressableButton>
    </FormControl>
  );
};

export default FormikChips;
