import React, {memo} from 'react';
import {FormControl, Input, useColorMode} from 'native-base';
import withFormikWrapper, {FormikInputProps} from '../../shared/hocs/withFormikWrapper';
import {flowRight} from 'lodash';

type FormikTextInputProps = FormikInputProps;

const FormikTextInput = (props: FormikTextInputProps) => {
  const {label, placeholder, value, error, isTouched, isError, isDisabled, isTrim, onChange, onBlur} = props;
  const {colorMode} = useColorMode();

  const handleChange = (text: string): void => {
    const newValue = isTrim ? text.trim() : text;
    onChange(newValue);
  };

  return (
    <FormControl isInvalid={isTouched && isError} isDisabled={isDisabled}>
      {label && <FormControl.Label>{label}</FormControl.Label>}
      <Input
        type="text"
        autoCapitalize="none"
        keyboardAppearance={colorMode}
        placeholder={placeholder}
        onChangeText={handleChange}
        onBlur={onBlur}
        value={value}
      />
      {isTouched && <FormControl.ErrorMessage>{error}</FormControl.ErrorMessage>}
    </FormControl>
  );
};

export default flowRight([withFormikWrapper, memo])(FormikTextInput);
