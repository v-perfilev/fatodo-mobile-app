import React, {useEffect, useState} from 'react';
import {Reminder} from '../../../models/Reminder';
import {useTranslation} from 'react-i18next';
import {DateParams} from '../../../models/DateParams';
import DateTimeSelect from '../DateTimeSelect';
import DaysSelect from '../DaysSelect';
import {DateConverters} from '../../../shared/utils/DateConverters';

type FormikRemindersInputWeeklyProps = {
  setReminder: (reminder: Reminder) => void;
  locale: string;
  timezone: string;
};

const FormikRemindersInputWeekly = ({setReminder, locale, timezone}: FormikRemindersInputWeeklyProps) => {
  const {t} = useTranslation();
  const [time, setTime] = useState<Date>(null);
  const [days, setDays] = useState<number[]>([]);

  const updateReminder = (): void => {
    if (time && days && days.length > 0) {
      const paramDate: DateParams = DateConverters.getParamDateFromTimeAndDate(time, null, timezone);
      setReminder({date: paramDate, weekDays: days, periodicity: 'WEEKLY'});
    } else {
      setReminder(null);
    }
  };

  useEffect(() => {
    updateReminder();
  }, [time, days]);

  return (
    <>
      <DateTimeSelect label={t('common:reminders.fields.time')} mode="time" setResult={setTime} locale={locale} />
      <DaysSelect label={t('common:reminders.fields.weekdays')} days={days} setDays={setDays} />
    </>
  );
};

export default FormikRemindersInputWeekly;
