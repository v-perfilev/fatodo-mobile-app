import React from 'react';
import {useTranslation} from 'react-i18next';
import StubBox from '../../../../components/surfaces/StubBox';

const CalendarViewRemindersEmptyStub = () => {
  const {t} = useTranslation();
  return <StubBox>{t('calendar:list.noReminders')}</StubBox>;
};

export default CalendarViewRemindersEmptyStub;
