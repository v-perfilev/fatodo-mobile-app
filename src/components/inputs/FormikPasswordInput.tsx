import React, {FC, useState} from 'react';
import {FormControl, IFormControlProps, Input} from 'native-base';
import {FormikProps} from 'formik';
import VisibleOffIcon from '../icons/VisibleOffIcon';
import {GestureResponderEvent} from 'react-native';
import VisibleOnIcon from '../icons/VisibleOnIcon';

type FormikPasswordInputProps = IFormControlProps &
  FormikProps<any> & {
    name: string;
    label?: string;
    placeholder?: string;
  };

const FormikPasswordInput: FC<FormikPasswordInputProps> = (props) => {
  const {name, label, placeholder} = props;
  const {values, errors, touched, handleChange, handleBlur} = props;
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const isTouched = name in touched;
  const isError = name in errors;

  const toggleShowPassword = (e: GestureResponderEvent): void => {
    e.preventDefault();
    setShowPassword((prevState) => !prevState);
  };

  const InputRightElement = showPassword ? (
    <VisibleOffIcon color="gray.300" size="sm" mx="2" onPress={toggleShowPassword} />
  ) : (
    <VisibleOnIcon color="gray.300" size="sm" mx="2" onPress={toggleShowPassword} />
  );

  return (
    <FormControl isInvalid={isTouched && isError} {...props}>
      {label && <FormControl.Label>{label}</FormControl.Label>}
      <Input
        type={showPassword ? 'text' : 'password'}
        placeholder={placeholder}
        onChangeText={handleChange(name)}
        onBlur={handleBlur(name)}
        value={values[name]}
        InputRightElement={InputRightElement}
      />
      {isTouched && <FormControl.ErrorMessage>{errors[name]}</FormControl.ErrorMessage>}
    </FormControl>
  );
};

export default FormikPasswordInput;
