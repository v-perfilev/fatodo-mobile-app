import React, {memo, ReactElement, useMemo} from 'react';
import {FormControl, Radio} from 'native-base';
import FVStack from '../boxes/FVStack';
import withFormikWrapper, {FormikInputProps} from '../../shared/hocs/withFormikWrapper';
import {flowRight} from 'lodash';

type FormikTextInputProps = FormikInputProps;

const FormikRadioInput = (props: FormikTextInputProps) => {
  const {label, options, value, error, isTouched, isError, isDisabled, onChange} = props;

  const optionElements = useMemo<ReactElement[]>(
    () =>
      Array.from(options.keys()).map((option, index) => (
        <Radio value={option} key={index}>
          {options.get(option)}
        </Radio>
      )),
    [options],
  );

  return (
    <FormControl isInvalid={isTouched && isError} isDisabled={isDisabled}>
      {label && <FormControl.Label>{label}</FormControl.Label>}
      <Radio.Group name={label} onChange={onChange} value={value}>
        <FVStack space="4" my="2">
          {optionElements}
        </FVStack>
      </Radio.Group>
      {isTouched && <FormControl.ErrorMessage>{error}</FormControl.ErrorMessage>}
    </FormControl>
  );
};

export default flowRight([memo, withFormikWrapper])(FormikRadioInput);
