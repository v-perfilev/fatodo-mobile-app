import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ReminderPeriodicity} from '../../../models/Reminder';
import {PresenceTransition, Text} from 'native-base';
import OnceIcon from '../../icons/OnceIcon';
import DayIcon from '../../icons/DayIcon';
import WeekIcon from '../../icons/WeekIcon';
import MonthIcon from '../../icons/MonthIcon';
import YearIcon from '../../icons/YearIcon';
import FVStack from '../../boxes/FVStack';
import IconButton from '../../controls/IconButton';
import FHStack from '../../boxes/FHStack';

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

  const onceBg = periodicity === 'ONCE' ? 'white' : null;
  const dayBg = periodicity === 'DAILY' ? 'white' : null;
  const weekBg = periodicity === 'WEEKLY' ? 'white' : null;
  const monthBg = periodicity === 'MONTHLY' ? 'white' : null;
  const yearBg = periodicity === 'YEARLY' ? 'white' : null;

  return (
    <FVStack bg="primary.500" alignItems="center" p="2">
      <FHStack space="1.5">
        <IconButton
          size="xl"
          colorScheme="white"
          bgColorScheme={onceBg}
          icon={<OnceIcon />}
          onPress={handleOnceClick}
        />
        <IconButton size="xl" colorScheme="white" bgColorScheme={dayBg} icon={<DayIcon />} onPress={handleDayClick} />
        <IconButton
          size="xl"
          colorScheme="white"
          bgColorScheme={weekBg}
          icon={<WeekIcon />}
          onPress={handleWeekClick}
        />
        <IconButton
          size="xl"
          colorScheme="white"
          bgColorScheme={monthBg}
          icon={<MonthIcon />}
          onPress={handleMonthClick}
        />
        <IconButton
          size="xl"
          colorScheme="white"
          bgColorScheme={yearBg}
          icon={<YearIcon />}
          onPress={handleYearClick}
        />
      </FHStack>
      <PresenceTransition
        visible={show}
        initial={{opacity: 0, scale: 0}}
        animate={{opacity: 1, scale: 1, transition: {duration: 100, delay: 150}}}
      >
        <Text color="white" fontWeight="600" fontSize="lg">
          {t('common:reminders.periodicity.' + periodicity)}
        </Text>
      </PresenceTransition>
    </FVStack>
  );
};

export default FormikRemindersInputToolbar;
