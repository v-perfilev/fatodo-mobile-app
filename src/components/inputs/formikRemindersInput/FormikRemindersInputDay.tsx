import React from 'react';
import {Box} from 'native-base';
import {Reminder} from '../../../models/Reminder';

type FormikRemindersInputDayProps = {
  setReminder: (reminder: Reminder) => void;
  timezone: string;
};

const FormikRemindersInputDay = ({setReminder, timezone}: FormikRemindersInputDayProps) => {
  return <Box />;
};

export default FormikRemindersInputDay;
