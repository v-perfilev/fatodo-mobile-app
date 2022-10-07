import React, {memo, ReactElement} from 'react';
import {IFormControlProps} from 'native-base';
import {FormikProps} from 'formik';
import FormikSelect from './FormikSelect';
import {itemTypes} from '../../models/Item';
import TypeView from '../views/TypeView';

type FormikTypeInputProps = IFormControlProps &
  FormikProps<any> & {
    name: string;
    label?: string;
  };

const typeSelectMap = new Map<string, ReactElement>();
itemTypes.forEach((t) => typeSelectMap.set(t, <TypeView type={t} />));

const FormikTypeInput = (props: FormikTypeInputProps) => {
  return <FormikSelect options={typeSelectMap} {...props} />;
};

export default memo(FormikTypeInput);
