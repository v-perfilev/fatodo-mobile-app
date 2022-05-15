import React from 'react';
import {Box} from 'native-base';
import {Reminder} from '../../../models/Reminder';

type FormikRemindersInputYearlyProps = {
  setReminder: (reminder: Reminder) => void;
  locale: string;
  timezone: string;
};

const FormikRemindersInputYearly = ({setReminder, locale, timezone}: FormikRemindersInputYearlyProps) => {
  return <Box />;
};

export default FormikRemindersInputYearly;
