import React from 'react';
import {IFormControlProps} from 'native-base';
import {FormikProps} from 'formik';
import FormikSelect from './FormikSelect';
import {ItemPriorityType, itemPriorityTypes} from '../../models/Item';
import PriorityView from '../views/PriorityView';

type FormikTypeInputProps = IFormControlProps &
  FormikProps<any> & {
    name: string;
    label?: string;
  };

const FormikTypeInput = (props: FormikTypeInputProps) => {
  const view = (current: ItemPriorityType) => <PriorityView priority={current} />;
  return <FormikSelect options={itemPriorityTypes} view={view} {...props} />;
};

export default FormikTypeInput;
