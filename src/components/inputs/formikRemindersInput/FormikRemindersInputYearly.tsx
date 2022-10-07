import React, {memo, useEffect, useState} from 'react';
import {Reminder} from '../../../models/Reminder';
import {useTranslation} from 'react-i18next';
import {DateParams} from '../../../models/DateParams';
import DateTimeSelect from '../DateTimeSelect';
import {DateConverters} from '../../../shared/utils/DateConverters';
import {useAppSelector} from '../../../store/store';
import AuthSelectors from '../../../store/auth/authSelectors';
import FVStack from '../../boxes/FVStack';

type FormikRemindersInputYearlyProps = {
  setReminder: (reminder: Reminder) => void;
};

const FormikRemindersInputYearly = ({setReminder}: FormikRemindersInputYearlyProps) => {
  const account = useAppSelector(AuthSelectors.account);
  const {t} = useTranslation();
  const [time, setTime] = useState<Date>(null);
  const [date, setDate] = useState<Date>(null);

  const timezone = account.info.timezone;

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
    <FVStack w="100%" h="100%" defaultSpace>
      <DateTimeSelect label={t('common:reminders.fields.time')} mode="time" setResult={setTime} />
      <DateTimeSelect label={t('common:reminders.fields.date')} mode="shortDate" setResult={setDate} />
    </FVStack>
  );
};

export default memo(FormikRemindersInputYearly);
