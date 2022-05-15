import React from 'react';
import {Box} from 'native-base';
import {Reminder} from '../../../models/Reminder';

type FormikRemindersInputMonthProps = {
  setReminder: (reminder: Reminder) => void;
  timezone: string;
};

const FormikRemindersInputMonth = ({setReminder, timezone}: FormikRemindersInputMonthProps) => {
  return <Box />;
};

export default FormikRemindersInputMonth;
