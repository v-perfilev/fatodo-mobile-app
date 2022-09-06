import React, {ReactElement, useMemo} from 'react';
import {IFormControlProps, Text} from 'native-base';
import {FormikProps} from 'formik';
import FormikRadioInput from './FormikRadioInput';
import {useTranslation} from 'react-i18next';
import {genders} from '../../models/User';

type FormikGenderInputProps = IFormControlProps &
  FormikProps<any> & {
    name: string;
    label?: string;
  };

const FormikGenderInput = (props: FormikGenderInputProps) => {
  const {t, i18n} = useTranslation();

  const genderSelectMap = useMemo<Map<string, ReactElement>>(() => {
    const map = new Map<string, ReactElement>();
    genders.forEach((g) => map.set(g, <Text>{t('account:fields.gender.options.' + g)}</Text>));
    return map;
  }, [i18n.language]);

  return <FormikRadioInput options={genderSelectMap} {...props} />;
};

export default FormikGenderInput;
