import React, {memo, ReactElement} from 'react';
import {IFormControlProps} from 'native-base';
import {FormikProps} from 'formik';
import FormikSelect from './FormikSelect';
import {itemPriorityTypes} from '../../models/Item';
import PriorityView from '../views/PriorityView';

type FormikTypeInputProps = IFormControlProps &
  FormikProps<any> & {
    name: string;
    label?: string;
  };

const prioritySelectMap = new Map<number, ReactElement>();
itemPriorityTypes.forEach((p, index) => prioritySelectMap.set(index + 1, <PriorityView priority={p} />));

const FormikTypeInput = (props: FormikTypeInputProps) => {
  return <FormikSelect options={prioritySelectMap} {...props} />;
};

export default memo(FormikTypeInput);
