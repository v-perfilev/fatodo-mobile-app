import React from 'react';
import {Box} from 'native-base';
import {Reminder} from '../../../models/Reminder';

type FormikRemindersInputYearProps = {
  setReminder: (reminder: Reminder) => void;
  timezone: string;
};

const FormikRemindersInputYear = ({setReminder, timezone}: FormikRemindersInputYearProps) => {
  return <Box />;
};

export default FormikRemindersInputYear;
