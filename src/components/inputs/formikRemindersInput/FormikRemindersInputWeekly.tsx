import React, {memo, useEffect, useState} from 'react';
import {Reminder} from '../../../models/Reminder';
import {useTranslation} from 'react-i18next';
import {DateParams} from '../../../models/DateParams';
import DateTimeSelect from '../DateTimeSelect';
import DaysSelect from '../DaysSelect';
import {DateConverters} from '../../../shared/utils/DateConverters';
import {useAppSelector} from '../../../store/store';
import AuthSelectors from '../../../store/auth/authSelectors';
import FVStack from '../../boxes/FVStack';

type FormikRemindersInputWeeklyProps = {
  setReminder: (reminder: Reminder) => void;
};

const FormikRemindersInputWeekly = ({setReminder}: FormikRemindersInputWeeklyProps) => {
  const account = useAppSelector(AuthSelectors.account);
  const {t} = useTranslation();
  const [time, setTime] = useState<Date>(null);
  const [days, setDays] = useState<number[]>([]);

  const timezone = account.settings.timezone;

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
    <FVStack w="100%" h="100%" space="3">
      <DateTimeSelect label={t('common:reminders.fields.time')} mode="time" setResult={setTime} />
      <DaysSelect label={t('common:reminders.fields.weekdays')} days={days} setDays={setDays} />
    </FVStack>
  );
};

export default memo(FormikRemindersInputWeekly);
