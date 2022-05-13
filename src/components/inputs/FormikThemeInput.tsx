import React from 'react';
import {Box, IFormControlProps} from 'native-base';
import {FormikProps} from 'formik';
import ThemeView from '../views/ThemeView';
import {ColorScheme, colorSchemes} from '../../shared/themes/ThemeFactory';
import FormikSelect from './FormikSelect';

type FormikThemeInputProps = IFormControlProps &
  FormikProps<any> & {
    name: string;
    label?: string;
  };

const FormikThemeInput = (props: FormikThemeInputProps) => {
  const view = (current: ColorScheme) => (
    <Box minH="40px">
      <ThemeView color={current} />
    </Box>
  );
  return <FormikSelect options={colorSchemes} view={view} {...props} />;
};

export default FormikThemeInput;
