import React, {FC} from 'react';
import {FormControl, Input} from 'native-base';
import {FormikProps} from 'formik';

type FormikPasswordInputProps = FormikProps<any> & {
  name: string;
  label?: string;
  placeholder?: string;
};

const FormikPasswordInput: FC<FormikPasswordInputProps> = (props) => {
  const {name, label, placeholder} = props;
  const {values, errors, touched, handleChange, handleBlur} = props;

  const isTouched = name in touched;
  const isError = name in errors;

  return (
    <FormControl isInvalid={isTouched && isError}>
      {label && <FormControl.Label>{label}</FormControl.Label>}
      <Input
        type="password"
        placeholder={placeholder}
        onChangeText={handleChange(name)}
        onBlur={handleBlur(name)}
        value={values[name]}
      />
      {isTouched && <FormControl.ErrorMessage>{errors[name]}</FormControl.ErrorMessage>}
    </FormControl>
  );
};

export default FormikPasswordInput;
