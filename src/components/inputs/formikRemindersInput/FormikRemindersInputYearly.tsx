import React, {useEffect, useState} from 'react';
import {Reminder} from '../../../models/Reminder';
import {useTranslation} from 'react-i18next';
import {DateParams} from '../../../models/DateParams';
import DateTimeSelect from '../DateTimeSelect';
import {DateConverters} from '../../../shared/utils/DateConverters';

type FormikRemindersInputYearlyProps = {
  setReminder: (reminder: Reminder) => void;
  locale: string;
  timezone: string;
};

const FormikRemindersInputYearly = ({setReminder, locale, timezone}: FormikRemindersInputYearlyProps) => {
  const {t} = useTranslation();
  const [time, setTime] = useState<Date>(null);
  const [date, setDate] = useState<Date>(null);

  const updateReminder = (): void => {
    if (time && date) {
      const paramDate: DateParams = DateConverters.getParamDateFromTimeAndDate(time, date, timezone, true);
      setReminder({date: paramDate, periodicity: 'YEARLY'});
    } else {
      setReminder(null);
    }
  };

  useEffect(() => {
    updateReminder();
  }, [time, date]);

  return (
    <>
      <DateTimeSelect label={t('common:reminders.fields.time')} mode="time" setResult={setTime} locale={locale} />
      <DateTimeSelect label={t('common:reminders.fields.date')} mode="shortDate" setResult={setDate} locale={locale} />
    </>
  );
};

export default FormikRemindersInputYearly;
