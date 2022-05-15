import React from 'react';
import {Box} from 'native-base';
import {Reminder} from '../../../models/Reminder';

type FormikRemindersInputWeekProps = {
  setReminder: (reminder: Reminder) => void;
  timezone: string;
};

const FormikRemindersInputWeek = ({setReminder, timezone}: FormikRemindersInputWeekProps) => {
  return <Box />;
};

export default FormikRemindersInputWeek;
