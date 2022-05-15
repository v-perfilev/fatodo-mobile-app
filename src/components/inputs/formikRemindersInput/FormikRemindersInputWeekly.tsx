import React from 'react';
import {Box} from 'native-base';
import {Reminder} from '../../../models/Reminder';

type FormikRemindersInputWeeklyProps = {
  setReminder: (reminder: Reminder) => void;
  locale: string;
  timezone: string;
};

const FormikRemindersInputWeekly = ({setReminder, locale, timezone}: FormikRemindersInputWeeklyProps) => {
  return <Box />;
};

export default FormikRemindersInputWeekly;
