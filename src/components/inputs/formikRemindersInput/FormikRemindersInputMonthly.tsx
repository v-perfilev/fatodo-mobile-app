import React from 'react';
import {Box} from 'native-base';
import {Reminder} from '../../../models/Reminder';

type FormikRemindersInputMonthlyProps = {
  setReminder: (reminder: Reminder) => void;
  locale: string;
  timezone: string;
};

const FormikRemindersInputMonthly = ({setReminder, locale, timezone}: FormikRemindersInputMonthlyProps) => {
  return <Box />;
};

export default FormikRemindersInputMonthly;
