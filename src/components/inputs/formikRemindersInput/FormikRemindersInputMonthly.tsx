import React, {useEffect, useState} from 'react';
import {Reminder} from '../../../models/Reminder';
import {useTranslation} from 'react-i18next';
import {DateParams} from '../../../models/DateParams';
import DateTimeSelect from '../DateTimeSelect';
import DatesSelect from '../DatesSelect';
import {DateConverters} from '../../../shared/utils/DateConverters';
import {useAppSelector} from '../../../store/store';
import AuthSelectors from '../../../store/auth/authSelectors';

type FormikRemindersInputMonthlyProps = {
  setReminder: (reminder: Reminder) => void;
};

const FormikRemindersInputMonthly = ({setReminder}: FormikRemindersInputMonthlyProps) => {
  const account = useAppSelector(AuthSelectors.account);
  const {t} = useTranslation();
  const [time, setTime] = useState<Date>(null);
  const [dates, setDates] = useState<number[]>([]);

  const timezone = account.info.timezone;

  const updateReminder = (): void => {
    if (time && dates && dates.length > 0) {
      const paramDate: DateParams = DateConverters.getParamDateFromTimeAndDate(time, null, timezone);
      setReminder({date: paramDate, monthDays: dates, periodicity: 'MONTHLY'});
    } else {
      setReminder(null);
    }
  };

  useEffect(() => {
    updateReminder();
  }, [time, dates]);

  return (
    <>
      <DateTimeSelect label={t('common:reminders.fields.time')} mode="time" setResult={setTime} />
      <DatesSelect label={t('common:reminders.fields.monthdays')} dates={dates} setDates={setDates} />
    </>
  );
};

export default FormikRemindersInputMonthly;
