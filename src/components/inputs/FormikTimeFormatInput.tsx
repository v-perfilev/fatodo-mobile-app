import React, {memo, ReactElement, useMemo} from 'react';
import {IFormControlProps, Text} from 'native-base';
import {FormikProps} from 'formik';
import {useTranslation} from 'react-i18next';
import {timeFormats} from '../../models/User';
import FormikSelect from './FormikSelect';

type FormikGenderInputProps = IFormControlProps &
  FormikProps<any> & {
    name: string;
    label?: string;
  };

const FormikTimeFormatInput = (props: FormikGenderInputProps) => {
  const {t, i18n} = useTranslation();

  const formatSelectMap = useMemo<Map<string, ReactElement>>(() => {
    const map = new Map<string, ReactElement>();
    timeFormats.forEach((f) => map.set(f, <Text>{t('account:fields.timeFormat.options.' + f)}</Text>));
    return map;
  }, [i18n.language]);

  return <FormikSelect options={formatSelectMap} {...props} />;
};

export default memo(FormikTimeFormatInput);
