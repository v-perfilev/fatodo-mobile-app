import React, {memo} from 'react';
import {FormControl, TextArea} from 'native-base';
import {INPUT_FONT_SIZE} from '../../constants';
import {flowRight} from 'lodash';
import withFormikWrapper, {FormikInputProps} from '../../shared/hocs/withFormikWrapper';

type FormikMultilineInputProps = FormikInputProps;

const FormikMultilineInput = (props: FormikMultilineInputProps) => {
  const {label, placeholder, value, error, isTouched, isError, isDisabled, onChange, onBlur} = props;

  return (
    <FormControl isInvalid={isTouched && isError} isDisabled={isDisabled}>
      {label && <FormControl.Label>{label}</FormControl.Label>}
      <TextArea
        placeholder={placeholder}
        fontSize={INPUT_FONT_SIZE}
        onChangeText={onChange}
        onBlur={onBlur}
        value={value}
        h={120}
        totalLines={20}
        autoCompleteType={undefined}
      />
      {isTouched && <FormControl.ErrorMessage>{error}</FormControl.ErrorMessage>}
    </FormControl>
  );
};

export default flowRight(withFormikWrapper, memo)(FormikMultilineInput);
