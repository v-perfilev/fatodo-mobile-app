import React, {ReactElement, useMemo} from 'react';
import {Box, IFormControlProps} from 'native-base';
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
    const map = new Map<string, any>();
    colorSchemes.forEach((s) =>
      map.set(
        s,
        <Box minW="200px" h="35px">
          <ThemeView color={s} />
        </Box>,
      ),
    );
    return map;
  }, []);

  return <FormikSelect options={themeSelectMap} {...props} />;
};

export default FormikThemeInput;
