import React, {memo} from 'react';
import {FormControl, TextArea, useColorMode} from 'native-base';
import {flowRight} from 'lodash';
import withFormikWrapper, {FormikInputProps} from '../../shared/hocs/withFormikWrapper';

type FormikMultilineInputProps = FormikInputProps;

const FormikMultilineInput = (props: FormikMultilineInputProps) => {
  const {label, placeholder, value, error, isTouched, isError, isDisabled, onChange, onBlur} = props;
  const {colorMode} = useColorMode();

  return (
    <FormControl isInvalid={isTouched && isError} isDisabled={isDisabled}>
      {label && <FormControl.Label>{label}</FormControl.Label>}
      <TextArea
        placeholder={placeholder}
        totalLines={20}
        keyboardAppearance={colorMode}
        onChangeText={onChange}
        onBlur={onBlur}
        value={value}
        autoCompleteType={undefined}
      />
      {isTouched && <FormControl.ErrorMessage>{error}</FormControl.ErrorMessage>}
    </FormControl>
  );
};

export default flowRight(withFormikWrapper, memo)(FormikMultilineInput);
