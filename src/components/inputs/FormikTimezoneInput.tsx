import React, {memo, useMemo} from 'react';
import {IFormControlProps} from 'native-base';
import {FormikProps} from 'formik';
import FormikSelect from './FormikSelect';
import {timezones} from '../../shared/timezone';
import {DateFormatters} from '../../shared/utils/DateFormatters';

type FormikTimezoneInputProps = IFormControlProps &
  FormikProps<any> & {
    name: string;
    label?: string;
  };

const FormikTimezoneInput = (props: FormikTimezoneInputProps) => {
  const timezoneSelectMap = useMemo<Map<string, string>>(() => {
    const map = new Map<string, string>();
    timezones.forEach((t) => map.set(t, DateFormatters.formatTimezone(t)));
    return map;
  }, []);

  return <FormikSelect options={timezoneSelectMap} {...props} />;
};

export default memo(FormikTimezoneInput);
