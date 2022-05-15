import React from 'react';
import {Box} from 'native-base';
import {Reminder} from '../../../models/Reminder';

type FormikRemindersInputOnceProps = {
  setReminder: (reminder: Reminder) => void;
  timezone: string;
};

const FormikRemindersInputOnce = ({setReminder, timezone}: FormikRemindersInputOnceProps) => {
  return <Box />;
};

export default FormikRemindersInputOnce;
