import React, {ReactElement, useEffect, useState} from 'react';
import {Box, FormControl, IFormControlProps, Input} from 'native-base';
import {FormikProps} from 'formik';
import Menu, {MenuItem} from '../controls/Menu';
import PressableButton from '../controls/PressableButton';
import PaperBox from '../surfaces/PaperBox';

type FormikSelectProps<T> = IFormControlProps &
  FormikProps<any> & {
    name: string;
    label?: string;
    options: T[];
    view: (current: T) => ReactElement;
  };

const FormikSelect = (props: FormikSelectProps<any>) => {
  const {name, label, options, view} = props;
  const {values, errors, touched, handleChange, handleBlur} = props;
  const [current, setCurrent] = useState<any>();

  const value = values[name];
  const isTouched = name in touched;
  const isError = name in errors;

  useEffect(() => {
    setCurrent(value);
  }, [value]);

  return (
    <FormControl isInvalid={isTouched && isError} {...props}>
      {label && <FormControl.Label>{label}</FormControl.Label>}
      <Input type="text" onChangeText={handleChange(name)} onBlur={handleBlur(name)} value={current} display="none" />

      <Menu
        trigger={(triggerProps) => (
          <PressableButton {...triggerProps}>
            <PaperBox h="45px" justifyContent="center" px="3">
              {view(current)}
            </PaperBox>
          </PressableButton>
        )}
      >
        {Object.values(options).map((option, index) => (
          <MenuItem action={() => setCurrent(option)} key={index}>
            <Box alignItems="center">{view(option)}</Box>
          </MenuItem>
        ))}
      </Menu>

      {isTouched && <FormControl.ErrorMessage>{errors[name]}</FormControl.ErrorMessage>}
    </FormControl>
  );
};

export default FormikSelect;
