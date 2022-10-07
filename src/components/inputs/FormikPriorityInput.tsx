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

const prioritySelectMap = new Map<string, ReactElement>();
itemPriorityTypes.forEach((p) => prioritySelectMap.set(p, <PriorityView priority={p} />));

const FormikTypeInput = (props: FormikTypeInputProps) => {
  return <FormikSelect options={prioritySelectMap} {...props} />;
};

export default memo(FormikTypeInput);
