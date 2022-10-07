import React, {memo, ReactElement, useMemo} from 'react';
import {IFormControlProps, Text} from 'native-base';
import {FormikProps} from 'formik';
import {useTranslation} from 'react-i18next';
import {dateFormats} from '../../models/User';
import FormikSelect from './FormikSelect';

type FormikGenderInputProps = IFormControlProps &
  FormikProps<any> & {
    name: string;
    label?: string;
  };

const FormikDateFormatInput = (props: FormikGenderInputProps) => {
  const {t, i18n} = useTranslation();

  const formatSelectMap = useMemo<Map<string, ReactElement>>(() => {
    const map = new Map<string, ReactElement>();
    dateFormats.forEach((f) => map.set(f, <Text>{t('account:fields.dateFormat.options.' + f)}</Text>));
    return map;
  }, [i18n.language]);

  return <FormikSelect options={formatSelectMap} {...props} />;
};

export default memo(FormikDateFormatInput);
