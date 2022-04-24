import React, {FC, useEffect, useState} from 'react';
import {Box, FormControl, IFormControlProps, Input} from 'native-base';
import {FormikProps} from 'formik';
import ThemeView from '../views/ThemeView';
import {ColorScheme, colorSchemes} from '../../shared/themes/ThemeFactory';
import Menu, {MenuItem} from '../controls/Menu';
import PressableButton from '../controls/PressableButton';
import PaperBox from '../surfaces/PaperBox';

type FormikThemeInputProps = IFormControlProps &
  FormikProps<any> & {
    name: string;
    label?: string;
  };

const FormikThemeInput: FC<FormikThemeInputProps> = (props) => {
  const {name, label} = props;
  const {values, errors, touched, handleChange, handleBlur} = props;
  const [theme, setTheme] = useState<ColorScheme>();

  const value = values[name];
  const isTouched = name in touched;
  const isError = name in errors;

  useEffect(() => {
    setTheme(value);
  }, [value]);

  return (
    <FormControl isInvalid={isTouched && isError} {...props}>
      {label && <FormControl.Label>{label}</FormControl.Label>}
      <Input type="text" onChangeText={handleChange(name)} onBlur={handleBlur(name)} value={theme} display="none" />

      <Menu
        trigger={(triggerProps) => (
          <PressableButton {...triggerProps}>
            <PaperBox h="45px">
              <ThemeView color={theme} />
            </PaperBox>
          </PressableButton>
        )}
      >
        {Object.values(colorSchemes).map((color, index) => (
          <MenuItem action={() => setTheme(color)} key={index}>
            <Box w="100%" h="40px">
              <ThemeView color={color} />
            </Box>
          </MenuItem>
        ))}
      </Menu>

      {isTouched && <FormControl.ErrorMessage>{errors[name]}</FormControl.ErrorMessage>}
    </FormControl>
  );
};

export default FormikThemeInput;
