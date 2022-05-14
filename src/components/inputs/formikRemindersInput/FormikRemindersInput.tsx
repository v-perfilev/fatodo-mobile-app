import React, {ReactElement} from 'react';
import {IFormControlProps} from 'native-base';
import {FormikProps} from 'formik';
import ReminderView from '../../views/ReminderView';
import {Reminder} from '../../../models/Reminder';
import FormikRemindersInputPopover from './FormikRemindersInputPopover';
import FormikChips from '../FormikChips';

type FormikRemindersInputProps = IFormControlProps &
  FormikProps<any> & {
    name: string;
    label?: string;
  };

const FormikRemindersInput = (props: FormikRemindersInputProps) => {
  const handleClose =
    (addValue: (value: Reminder) => void, close: () => void) =>
    (reminder: Reminder): void => {
      if (reminder) {
        addValue(reminder);
      }
      close();
    };

  const viewElement = (value: Reminder): ReactElement => <ReminderView reminder={value} />;

  const inputElement = (show: boolean, addValue: (value: Reminder) => void, close: () => void): ReactElement => (
    <FormikRemindersInputPopover show={show} handleClose={handleClose(addValue, close)} />
  );

  return <FormikChips view={viewElement} input={inputElement} {...props} />;
};

export default FormikRemindersInput;
