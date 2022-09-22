import * as React from 'react';
import {useAppSelector} from '../../store/store';
import AuthSelectors from '../../store/auth/authSelectors';
import {DateFormatters, DateFormatType, TimeFormatType} from '../../shared/utils/DateFormatters';

type DateViewProps = {
  date: Date;
  timeFormat?: TimeFormatType;
  dateFormat?: DateFormatType;
};

const DateView = ({date, timeFormat, dateFormat}: DateViewProps) => {
  const account = useAppSelector(AuthSelectors.account);
  const text = date ? DateFormatters.formatDate(date, account, timeFormat, dateFormat) : null;
  return <>{text}</>;
};

export default DateView;
