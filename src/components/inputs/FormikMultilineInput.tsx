import React, {memo} from 'react';
import {FormControl, TextArea, useColorMode} from 'native-base';
import {flowRight} from 'lodash';
import withFormikWrapper, {FormikInputProps} from '../../shared/hocs/withFormikWrapper';
import FBox from '../boxes/FBox';

type FormikMultilineInputProps = FormikInputProps;

const FormikMultilineInput = (props: FormikMultilineInputProps) => {
  const {label, placeholder, value, error, isTouched, isError, isDisabled, onChange, onBlur} = props;
  const {colorMode} = useColorMode();

  return (
    <FBox grow>
      <FormControl h="100%" minHeight="200" isInvalid={isTouched && isError} isDisabled={isDisabled}>
        {label && <FormControl.Label>{label}</FormControl.Label>}
        <TextArea
          flex={1}
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
    </FBox>
  );
};

export default flowRight(withFormikWrapper, memo)(FormikMultilineInput);
