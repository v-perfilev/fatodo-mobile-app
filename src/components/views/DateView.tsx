import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {flowRight} from 'lodash';
import {DateParams} from '../../models/DateParams';
import {ReduxAuthState} from '../../store/rerducers/AuthReducer';
import {DateConverters, DateFormatters} from '../../shared/utils/DateUtils';
import withAuthState from '../../shared/hocs/withAuthState';

type DateViewProps = ReduxAuthState & {
  date: DateParams;
};

const DateView = ({date: paramDate, account}: DateViewProps) => {
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

export default flowRight([withAuthState])(DateView);
