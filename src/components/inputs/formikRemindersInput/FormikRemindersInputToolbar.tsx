import React, {memo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ReminderPeriodicity} from '../../../models/Reminder';
import {PresenceTransition, Text} from 'native-base';
import OnceIcon from '../../icons/OnceIcon';
import DayIcon from '../../icons/DayIcon';
import WeekIcon from '../../icons/WeekIcon';
import MonthIcon from '../../icons/MonthIcon';
import YearIcon from '../../icons/YearIcon';
import FVStack from '../../boxes/FVStack';
import FHStack from '../../boxes/FHStack';
import IconButton from '../../controls/IconButton';

type FormikRemindersInputToolbarProps = {
  periodicity: ReminderPeriodicity;
  setPeriodicity: (periodicity: ReminderPeriodicity) => void;
};

const FormikRemindersInputToolbar = ({periodicity, setPeriodicity}: FormikRemindersInputToolbarProps) => {
  const {t} = useTranslation();
  const [show, setShow] = useState(true);

  const selectPeriodicity = (newPeriodicity: ReminderPeriodicity): void => {
    if (newPeriodicity !== null && periodicity !== newPeriodicity) {
      setShow(false);
      setTimeout(() => {
        setShow(true);
        setPeriodicity(newPeriodicity);
      }, 150);
    }
  };

  const handleOnceClick = (): void => selectPeriodicity('ONCE');
  const handleDayClick = (): void => selectPeriodicity('DAILY');
  const handleWeekClick = (): void => selectPeriodicity('WEEKLY');
  const handleMonthClick = (): void => selectPeriodicity('MONTHLY');
  const handleYearClick = (): void => selectPeriodicity('YEARLY');

  const onceVariant = periodicity === 'ONCE' ? 'solid' : undefined;
  const dayVariant = periodicity === 'DAILY' ? 'solid' : undefined;
  const weekVariant = periodicity === 'WEEKLY' ? 'solid' : undefined;
  const monthVariant = periodicity === 'MONTHLY' ? 'solid' : undefined;
  const yearVariant = periodicity === 'YEARLY' ? 'solid' : undefined;

  return (
    <FVStack alignItems="center" p="2">
      <FHStack space="1.5">
        <IconButton padding="2" variant={onceVariant} icon={<OnceIcon />} onPress={handleOnceClick} />
        <IconButton padding="2" variant={dayVariant} icon={<DayIcon />} onPress={handleDayClick} />
        <IconButton padding="2" variant={weekVariant} icon={<WeekIcon />} onPress={handleWeekClick} />
        <IconButton padding="2" variant={monthVariant} icon={<MonthIcon />} onPress={handleMonthClick} />
        <IconButton padding="2" variant={yearVariant} icon={<YearIcon />} onPress={handleYearClick} />
      </FHStack>
      <PresenceTransition
        visible={show}
        initial={{opacity: 0, scale: 0}}
        animate={{opacity: 1, scale: 1, transition: {duration: 50, delay: 50}}}
      >
        <Text color="primary.500" fontWeight="600" fontSize="lg">
          {t('common:reminders.periodicity.' + periodicity)}
        </Text>
      </PresenceTransition>
    </FVStack>
  );
};

export default memo(FormikRemindersInputToolbar);
