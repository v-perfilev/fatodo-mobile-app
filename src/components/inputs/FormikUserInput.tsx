import React, {useEffect} from 'react';
import {FormControl, IFormControlProps, Input} from 'native-base';
import {FormikProps} from 'formik';
import {INPUT_FONT_SIZE} from '../../constants';
import {useAppDispatch} from '../../store/store';
import {InfoThunks} from '../../store/info/infoActions';

type FormikUserInputProps = IFormControlProps &
  FormikProps<any> & {
    name: string;
    userName: string;
    label?: string;
    placeholder?: string;
  };

const FormikUserInput = (props: FormikUserInputProps) => {
  const dispatch = useAppDispatch();
  const {name, userName, label, placeholder} = props;
  const {values, errors, touched, handleChange, handleBlur, setFieldValue} = props;

  const value = values[name];
  const isTouched = name in touched;
  const isError = name in errors;

  useEffect(() => {
    if (value.length > 1 && !isError) {
      dispatch(InfoThunks.fetchUsersByUsernameOrEmail(value))
        .unwrap()
        .then((user) => setFieldValue(userName, user));
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
