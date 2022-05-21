import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {DateParams} from '../../models/DateParams';
import {DateConverters, DateFormatters} from '../../shared/utils/DateUtils';
import {useAppSelector} from '../../store/store';
import AuthSelectors from '../../store/auth/authSelectors';

type DateViewProps = {
  date: DateParams;
};

const DateView = ({date: paramDate}: DateViewProps) => {
  const account = useAppSelector(AuthSelectors.accountSelector);
  const {t} = useTranslation();
  const timezone = account.info.timezone;

  let description = '';
  if (paramDate.time) {
    const timeDate = DateConverters.getTimeFromParamDate(paramDate, timezone);
    const time = DateFormatters.formatTime(timeDate);
    description = description.concat(t('common:paramDate.time', {time}));
  }

  if (paramDate.date && paramDate.month) {
    if (paramDate.time) {
      description = description.concat(' ');
    }

    const dateDate = DateConverters.getDateFromParamDate(paramDate, timezone);
    const date = paramDate.year ? DateFormatters.formatDateWithYear(dateDate) : DateFormatters.formatDate(dateDate);

    description = description.concat(t('common:paramDate.date', {date}));
  }

  return <>{description}</>;
};

export default DateView;
