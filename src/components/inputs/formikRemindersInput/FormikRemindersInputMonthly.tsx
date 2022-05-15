import React, {useEffect, useState} from 'react';
import {Reminder} from '../../../models/Reminder';
import {useTranslation} from 'react-i18next';
import {DateParams} from '../../../models/DateParams';
import {DateConverters} from '../../../shared/utils/DateUtils';
import DateTimeSelect from '../DateTimeSelect';
import DatesSelect from '../DatesSelect';

type FormikRemindersInputMonthlyProps = {
  setReminder: (reminder: Reminder) => void;
  locale: string;
  timezone: string;
};

const FormikRemindersInputMonthly = ({setReminder, locale, timezone}: FormikRemindersInputMonthlyProps) => {
  const {t} = useTranslation();
  const [time, setTime] = useState<Date>(null);
  const [dates, setDates] = useState<number[]>([]);

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
      <DateTimeSelect label={t('common:reminders.fields.time')} mode="time" setResult={setTime} locale={locale} />
      <DatesSelect label={t('common:reminders.fields.monthdays')} dates={dates} setDates={setDates} />
    </>
  );
};

export default FormikRemindersInputMonthly;
