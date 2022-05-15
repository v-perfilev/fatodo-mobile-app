import React from 'react';
import {IFormControlProps} from 'native-base';
import {FormikProps} from 'formik';
import FormikDateTimePicker from './FormikDateTimePicker';

type FormikTimeInputProps = IFormControlProps &
  FormikProps<any> & {
    name: string;
    label?: string;
  };

const FormikTimeInput = (props: FormikTimeInputProps) => {
  return <FormikDateTimePicker {...props} mode="time" />;
};
export default FormikTimeInput;
