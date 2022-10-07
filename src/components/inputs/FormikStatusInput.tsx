import React, {memo, ReactElement} from 'react';
import {IFormControlProps} from 'native-base';
import {FormikProps} from 'formik';
import FormikSelect from './FormikSelect';
import {itemStatusTypes} from '../../models/Item';
import StatusView from '../views/StatusView';

type FormikStatusInputProps = IFormControlProps &
  FormikProps<any> & {
    name: string;
    label?: string;
  };

const statusSelectMap = new Map<string, ReactElement>();
itemStatusTypes.forEach((s) => statusSelectMap.set(s, <StatusView statusType={s} />));

const FormikStatusInput = (props: FormikStatusInputProps) => {
  return <FormikSelect options={statusSelectMap} {...props} />;
};

export default memo(FormikStatusInput);
