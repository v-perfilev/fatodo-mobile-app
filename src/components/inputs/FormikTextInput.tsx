import React, {memo} from 'react';
import {FormControl, Input, useColorMode} from 'native-base';
import withFormikWrapper, {FormikInputProps} from '../../shared/hocs/withFormikWrapper';
import {flowRight} from 'lodash';

type FormikTextInputProps = FormikInputProps;

const FormikTextInput = (props: FormikTextInputProps) => {
  const {label, placeholder, value, error, isTouched, isError, isDisabled, onChange, onBlur} = props;
  const {colorMode} = useColorMode();

  return (
    <FormControl isInvalid={isTouched && isError} isDisabled={isDisabled}>
      {label && <FormControl.Label>{label}</FormControl.Label>}
      <Input
        type="text"
        autoCapitalize="none"
        keyboardAppearance={colorMode}
        placeholder={placeholder}
        onChangeText={onChange}
        onBlur={onBlur}
        value={value}
      />
      {isTouched && <FormControl.ErrorMessage>{error}</FormControl.ErrorMessage>}
    </FormControl>
  );
};

export default flowRight([withFormikWrapper, memo])(FormikTextInput);
