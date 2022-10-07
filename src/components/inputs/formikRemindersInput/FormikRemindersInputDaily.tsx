import React, {memo, useEffect, useState} from 'react';
import {Reminder} from '../../../models/Reminder';
import {useTranslation} from 'react-i18next';
import {DateParams} from '../../../models/DateParams';
import DateTimeSelect from '../DateTimeSelect';
import {DateConverters} from '../../../shared/utils/DateConverters';
import {useAppSelector} from '../../../store/store';
import AuthSelectors from '../../../store/auth/authSelectors';

type FormikRemindersInputDailyProps = {
  setReminder: (reminder: Reminder) => void;
};

const FormikRemindersInputDaily = ({setReminder}: FormikRemindersInputDailyProps) => {
  const account = useAppSelector(AuthSelectors.account);
  const {t} = useTranslation();
  const [time, setTime] = useState<Date>(null);

  const timezone = account.info.timezone;

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

  return <DateTimeSelect label={t('common:reminders.fields.time')} mode="time" setResult={setTime} />;
};

export default memo(FormikRemindersInputDaily);
