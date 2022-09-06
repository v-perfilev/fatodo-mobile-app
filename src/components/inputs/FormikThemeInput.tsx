import React, {ReactElement, useMemo} from 'react';
import {IFormControlProps} from 'native-base';
import {FormikProps} from 'formik';
import ThemeView from '../views/ThemeView';
import {colorSchemes} from '../../shared/themes/ThemeFactory';
import FormikSelect from './FormikSelect';

type FormikThemeInputProps = IFormControlProps &
  FormikProps<any> & {
    name: string;
    label?: string;
  };

const FormikThemeInput = (props: FormikThemeInputProps) => {
  const themeSelectMap = useMemo<Map<string, ReactElement>>(() => {
    const map = new Map<string, ReactElement>();
    colorSchemes.forEach((s) => map.set(s, <ThemeView color={s} />));
    return map;
  }, []);

  return <FormikSelect options={themeSelectMap} {...props} />;
};

export default FormikThemeInput;
