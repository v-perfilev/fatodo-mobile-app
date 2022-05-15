import React, {useEffect, useState} from 'react';
import {Reminder} from '../../../models/Reminder';
import {useTranslation} from 'react-i18next';
import {DateConverters} from '../../../shared/utils/DateUtils';
import {DateParams} from '../../../models/DateParams';
import DateTimeSelect from '../DateTimeSelect';

type FormikRemindersInputDailyProps = {
  setReminder: (reminder: Reminder) => void;
  locale: string;
  timezone: string;
};

const FormikRemindersInputDaily = ({setReminder, locale, timezone}: FormikRemindersInputDailyProps) => {
  const {t} = useTranslation();
  const [time, setTime] = useState<Date>(null);

  const updateReminder = (): void => {
    if (time) {
      const paramDate: DateParams = DateConverters.getParamDateFromTimeAndDate(time, null, timezone);
      setReminder({date: paramDate, periodicity: 'DAILY'});
    } else {
      setReminder(null);
    }
  };

  useEffect(() => {
    updateReminder();
  }, [time]);

  return (
    <>
      <DateTimeSelect label={t('common:reminders.fields.time')} mode="time" setResult={setTime} locale={locale} />
    </>
  );
};

export default FormikRemindersInputDaily;
