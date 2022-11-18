import React, {useEffect} from 'react';
import {FormControl, IFormControlProps, Input, useColorMode} from 'native-base';
import {FormikProps} from 'formik';
import {INPUT_FONT_SIZE, INPUT_MIN_HEIGHT} from '../../constants';
import UserService from '../../services/UserService';

type FormikUserInputProps = IFormControlProps &
  FormikProps<any> & {
    name: string;
    userName: string;
    label?: string;
    placeholder?: string;
  };

const FormikUserInput = (props: FormikUserInputProps) => {
  const {name, userName, label, placeholder} = props;
  const {values, errors, touched, handleChange, handleBlur, setFieldValue} = props;
  const {colorMode} = useColorMode();

  const value = values[name];
  const isTouched = name in touched;
  const isError = name in errors;

  useEffect(() => {
    if (value.length > 1 && !isError) {
      UserService.getByUsernameOrEmail(value).then((response) => setFieldValue(userName, response.data));
    } else {
      setFieldValue(userName, null);
    }
  }, [isError]);

  return (
    <FormControl isInvalid={isTouched && isError} {...props}>
      {label && <FormControl.Label>{label}</FormControl.Label>}
      <Input
        type="text"
        autoCapitalize="none"
        fontSize={INPUT_FONT_SIZE}
        minHeight={`${INPUT_MIN_HEIGHT}px`}
        keyboardAppearance={colorMode}
        placeholder={placeholder}
        onChangeText={handleChange(name)}
        onBlur={handleBlur(name)}
        value={values[name]}
      />
      {isTouched && <FormControl.ErrorMessage>{errors[name]}</FormControl.ErrorMessage>}
    </FormControl>
  );
};

export default FormikUserInput;
