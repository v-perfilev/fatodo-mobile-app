import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {Reminder} from '../../models/Reminder';
import {DateUtils} from '../../shared/utils/DateUtils';
import {useAppSelector} from '../../store/store';
import AuthSelectors from '../../store/auth/authSelectors';
import {DateConverters} from '../../shared/utils/DateConverters';
import {DateFormatters} from '../../shared/utils/DateFormatters';

type ReminderViewProps = {
  reminder: Reminder;
};

const ReminderView = ({reminder}: ReminderViewProps) => {
  const {t} = useTranslation();
  const account = useAppSelector(AuthSelectors.account);
  const timezone = account.settings.timezone;

  //need to set locale in moment here cause of bug in material-ui
  DateUtils.resetLocale();

  const label = t('common:reminders.periodicity.' + reminder.periodicity) + ': ';

  const timeDate = DateConverters.getTimeFromParamDate(reminder.date, timezone);
  const dateDate = DateConverters.getDateFromParamDate(reminder.date, timezone);

  const time = DateFormatters.formatDate(timeDate, account, 'FULL');

  const buildOnceDescription = (): string => {
    const date = DateFormatters.formatDate(dateDate, account, undefined, 'FULL');
    return t('common:reminders.' + reminder.periodicity, {time, date});
  };

  const buildDailyDescription = (): string => {
    return t('common:reminders.' + reminder.periodicity, {time});
  };

  const buildWeeklyDescription = (): string => {
    const reminderWeekDays = DateConverters.getWeekDaysFromParamDate(reminder.date, reminder.weekDays, timezone);
    const weekDays = DateUtils.getDayNamesByNumbers(reminderWeekDays)
      .map((str) => str.toUpperCase())
      .join(', ');
    return t('common:reminders.' + reminder.periodicity, {time, weekDays});
  };

  const buildMonthlyDescription = (): string => {
    const reminderMonthDays = DateConverters.getMonthDaysFromParamDate(reminder.date, reminder.monthDays, timezone);
    const monthDates = reminderMonthDays.join(', ');
    return t('common:reminders.' + reminder.periodicity, {time, monthDates});
  };

  const buildYearlyDescription = (): string => {
    const date = DateFormatters.formatDate(dateDate, account, undefined, 'SHORT');
    return t('common:reminders.' + reminder.periodicity, {time, date});
  };

  let description = '';
  if (reminder.periodicity === 'ONCE') {
    description = buildOnceDescription();
  } else if (reminder.periodicity === 'DAILY') {
    description = buildDailyDescription();
  } else if (reminder.periodicity === 'WEEKLY') {
    description = buildWeeklyDescription();
  } else if (reminder.periodicity === 'MONTHLY') {
    description = buildMonthlyDescription();
  } else if (reminder.periodicity === 'YEARLY') {
    description = buildYearlyDescription();
  }

  const reminderStr = label + description;
  return <>{reminderStr}</>;
};

export default ReminderView;
