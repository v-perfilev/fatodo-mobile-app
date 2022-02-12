import React, {FC} from 'react';
import {FormControl, IFormControlProps, Input} from 'native-base';
import {FormikProps} from 'formik';

type FormikTextInputProps = IFormControlProps &
  FormikProps<any> & {
    name: string;
    label?: string;
    placeholder?: string;
  };

const FormikTextInput: FC<FormikTextInputProps> = (props) => {
  const {name, label, placeholder} = props;
  const {values, errors, touched, handleChange, handleBlur} = props;

  const isTouched = name in touched;
  const isError = name in errors;

  return (
    <FormControl isInvalid={isTouched && isError} {...props}>
      {label && <FormControl.Label>{label}</FormControl.Label>}
      <Input
        type="text"
        placeholder={placeholder}
        onChangeText={handleChange(name)}
        onBlur={handleBlur(name)}
        value={values[name]}
      />
      {isTouched && <FormControl.ErrorMessage>{errors[name]}</FormControl.ErrorMessage>}
    </FormControl>
  );
};

export default FormikTextInput;
