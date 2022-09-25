import React, {useEffect, useState} from 'react';
import {Reminder} from '../../../models/Reminder';
import {useTranslation} from 'react-i18next';
import {DateParams} from '../../../models/DateParams';
import {DateUtils} from '../../../shared/utils/DateUtils';
import DateTimeSelect from '../DateTimeSelect';
import {DateConverters} from '../../../shared/utils/DateConverters';

type FormikRemindersInputOnceProps = {
  setReminder: (reminder: Reminder) => void;
  locale: string;
  timezone: string;
};

const FormikRemindersInputOnce = ({setReminder, locale, timezone}: FormikRemindersInputOnceProps) => {
  const {t} = useTranslation();
  const [time, setTime] = useState<Date>(null);
  const [date, setDate] = useState<Date>(null);
  const [minimumDate, setMinimumDate] = useState<Date>(null);

  const updateMinimum = (): void => {
    const now = new Date();
    if (date && DateUtils.isTheSameDay(now, date)) {
      const newMinimumDate = DateUtils.addMinutes(now, 10);
      setMinimumDate(newMinimumDate);
    } else if (time && DateUtils.isBefore(now, time)) {
      const newMinimumDate = DateUtils.addDays(now, 1);
      setMinimumDate(newMinimumDate);
    } else {
      const newMinimumDate = DateUtils.addDays(now, 0);
      setMinimumDate(newMinimumDate);
    }
  };

  const updateReminder = (): void => {
    if (time && date) {
      const paramDate: DateParams = DateConverters.getParamDateFromTimeAndDate(time, date, timezone);
      setReminder({date: paramDate, periodicity: 'ONCE'});
    } else {
      setReminder(null);
    }
  };

  useEffect(() => {
    updateMinimum();
    updateReminder();
  }, [time, date]);

  return (
    <>
      <DateTimeSelect
        label={t('common:reminders.fields.time')}
        mode="time"
        setResult={setTime}
        locale={locale}
        minimumDate={minimumDate}
      />
      <DateTimeSelect
        label={t('common:reminders.fields.date')}
        mode="fullDate"
        setResult={setDate}
        locale={locale}
        minimumDate={minimumDate}
      />
    </>
  );
};

export default FormikRemindersInputOnce;
