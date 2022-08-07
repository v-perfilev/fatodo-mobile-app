import React from 'react';
import StubBox from '../../../../components/surfaces/StubBox';
import {useTranslation} from 'react-i18next';

const CalendarViewRemindersNotSelectedStub = () => {
  const {t} = useTranslation();
  return <StubBox>{t('calendar:list.dateNotSelected')}</StubBox>;
};

export default CalendarViewRemindersNotSelectedStub;
