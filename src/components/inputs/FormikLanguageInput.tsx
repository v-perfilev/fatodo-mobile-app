import React, {useMemo} from 'react';
import {FormikProps} from 'formik';
import FormikSelect from './FormikSelect';
import {languages} from '../../shared/i18n';
import {IFormControlProps} from 'native-base';

type FormikLanguageInputProps = IFormControlProps &
  FormikProps<any> & {
    name: string;
    label?: string;
  };

const FormikLanguageInput = (props: FormikLanguageInputProps) => {
  const languageSelectMap = useMemo<Map<string, string>>(() => {
    const map = new Map<string, string>();
    languages.forEach((l) => map.set(l.code, l.name));
    return map;
  }, []);

  return <FormikSelect options={languageSelectMap} {...props} />;
};

export default FormikLanguageInput;
