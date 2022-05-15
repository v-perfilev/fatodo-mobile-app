import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ReminderPeriodicity} from '../../../models/Reminder';
import {Button, PresenceTransition, Text, VStack} from 'native-base';
import OnceIcon from '../../icons/OnceIcon';
import DayIcon from '../../icons/DayIcon';
import WeekIcon from '../../icons/WeekIcon';
import MonthIcon from '../../icons/MonthIcon';
import YearIcon from '../../icons/YearIcon';
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

  const activeColor = 'white:alpha.20';
  const onceBg = periodicity === 'ONCE' ? activeColor : undefined;
  const dayBg = periodicity === 'DAILY' ? activeColor : undefined;
  const weekBg = periodicity === 'WEEKLY' ? activeColor : undefined;
  const monthBg = periodicity === 'MONTHLY' ? activeColor : undefined;
  const yearBg = periodicity === 'YEARLY' ? activeColor : undefined;

  return (
    <VStack bg="primary.500" alignItems="center" p="2">
      <Button.Group space="1">
        <IconButton whiteIcon size="lg" icon={<OnceIcon />} onPress={handleOnceClick} bg={onceBg} />
        <IconButton whiteIcon size="lg" icon={<DayIcon />} onPress={handleDayClick} bg={dayBg} />
        <IconButton whiteIcon size="lg" icon={<WeekIcon />} onPress={handleWeekClick} bg={weekBg} />
        <IconButton whiteIcon size="lg" icon={<MonthIcon />} onPress={handleMonthClick} bg={monthBg} />
        <IconButton whiteIcon size="lg" icon={<YearIcon />} onPress={handleYearClick} bg={yearBg} />
      </Button.Group>
      <PresenceTransition
        visible={show}
        initial={{opacity: 0, scale: 0}}
        animate={{opacity: 1, scale: 1, transition: {duration: 100, delay: 150}}}
      >
        <Text color="white" fontWeight="600" fontSize="18">
          {t('common:reminders.periodicity.' + periodicity)}
        </Text>
      </PresenceTransition>
    </VStack>
  );
};

export default FormikRemindersInputToolbar;
