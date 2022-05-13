import React from 'react';
import {IFormControlProps} from 'native-base';
import {FormikProps} from 'formik';
import FormikSelect from './FormikSelect';
import {ItemType, itemTypes} from '../../models/Item';
import TypeView from '../views/TypeView';

type FormikTypeInputProps = IFormControlProps &
  FormikProps<any> & {
    name: string;
    label?: string;
  };

const FormikTypeInput = (props: FormikTypeInputProps) => {
  const view = (current: ItemType) => <TypeView type={current} />;
  return <FormikSelect options={itemTypes} view={view} {...props} />;
};

export default FormikTypeInput;
