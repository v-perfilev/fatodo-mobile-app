import React from 'react';
import {IFormControlProps} from 'native-base';
import {FormikProps} from 'formik';
import FormikDateTimePicker from './FormikDateTimePicker';

type FormikDateInputProps = IFormControlProps &
  FormikProps<any> & {
    name: string;
    label?: string;
  };

const FormikDateInput = (props: FormikDateInputProps) => {
  return <FormikDateTimePicker {...props} mode="date" />;
};
export default FormikDateInput;
