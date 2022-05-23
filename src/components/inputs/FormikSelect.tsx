import React, {ReactElement, useEffect, useState} from 'react';
import {Box, FormControl, IFormControlProps} from 'native-base';
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
  const {values, errors, touched, setFieldValue} = props;
  const [current, setCurrent] = useState<any>(values[name]);

  const isTouched = name in touched;
  const isError = name in errors;

  useEffect(() => {
    setFieldValue(name, current);
  }, [current]);

  return (
    <FormControl isInvalid={isTouched && isError} {...props}>
      {label && <FormControl.Label>{label}</FormControl.Label>}
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
