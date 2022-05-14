import React from 'react';
import {FormControl, IFormControlProps, TextArea} from 'native-base';
import {FormikProps} from 'formik';

type FormikMultilineInputProps = IFormControlProps &
  FormikProps<any> & {
    name: string;
    label?: string;
    placeholder?: string;
  };

const FormikMultilineInput = (props: FormikMultilineInputProps) => {
  const {name, label, placeholder} = props;
  const {values, errors, touched, handleChange, handleBlur} = props;

  const isTouched = name in touched;
  const isError = name in errors;

  return (
    <FormControl isInvalid={isTouched && isError} {...props}>
      {label && <FormControl.Label>{label}</FormControl.Label>}
      <TextArea
        placeholder={placeholder}
        onChangeText={handleChange(name)}
        onBlur={handleBlur(name)}
        value={values[name]}
        h={150}
        totalLines={20}
        autoCompleteType={undefined}
      />
      {isTouched && <FormControl.ErrorMessage>{errors[name]}</FormControl.ErrorMessage>}
    </FormControl>
  );
};

export default FormikMultilineInput;
