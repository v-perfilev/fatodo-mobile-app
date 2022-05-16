import React, {useState} from 'react';
import {FormControl, IFormControlProps, Input} from 'native-base';
import {FormikProps} from 'formik';
import VisibleOffIcon from '../icons/VisibleOffIcon';
import {GestureResponderEvent} from 'react-native';
import VisibleOnIcon from '../icons/VisibleOnIcon';
import {INPUT_FONT_SIZE} from '../../constants';

type FormikPasswordInputProps = IFormControlProps &
  FormikProps<any> & {
    name: string;
    label?: string;
    placeholder?: string;
  };

const FormikPasswordInput = (props: FormikPasswordInputProps) => {
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
    <VisibleOffIcon color="gray.300" size="md" mx="2" onPress={toggleShowPassword} />
  ) : (
    <VisibleOnIcon color="gray.300" size="md" mx="2" onPress={toggleShowPassword} />
  );

  return (
    <FormControl isInvalid={isTouched && isError} {...props}>
      {label && <FormControl.Label>{label}</FormControl.Label>}
      <Input
        type={showPassword ? 'text' : 'password'}
        autoCapitalize="none"
        placeholder={placeholder}
        fontSize={INPUT_FONT_SIZE}
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
