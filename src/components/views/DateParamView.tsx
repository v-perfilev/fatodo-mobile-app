import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {DateParams} from '../../models/DateParams';
import {useAppSelector} from '../../store/store';
import AuthSelectors from '../../store/auth/authSelectors';
import {DateConverters} from '../../shared/utils/DateConverters';
import {DateFormatters} from '../../shared/utils/DateFormatters';

type DateParamViewProps = {
  date: DateParams;
};

const DateParamView = ({date: paramDate}: DateParamViewProps) => {
  const {t} = useTranslation();
  const account = useAppSelector(AuthSelectors.account);
  const timezone = account.info.timezone;

  let description = '';
  if (paramDate.time) {
    const timeDate = DateConverters.getTimeFromParamDate(paramDate, timezone);
    const time = DateFormatters.formatDate(timeDate, account, 'FULL');
    description = description.concat(t('common:paramDate.time', {time}));
  }

  if (paramDate.date && paramDate.month) {
    if (paramDate.time) {
      description = description.concat(' ');
    }

    const dateDate = DateConverters.getDateFromParamDate(paramDate, timezone);
    const date = paramDate.year
      ? DateFormatters.formatDate(dateDate, account, undefined, 'FULL')
      : DateFormatters.formatDate(dateDate, account, undefined, 'SHORT');

    description = description.concat(t('common:paramDate.date', {date}));
  }

  return <>{description}</>;
};

export default DateParamView;