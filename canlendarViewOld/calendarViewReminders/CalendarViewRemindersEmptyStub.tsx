import React from 'react';
import StubBox from '../../src/components/surfaces/StubBox';
import {useTranslation} from 'react-i18next';

const CalendarViewRemindersEmptyStub = () => {
  const {t} = useTranslation();
  return <StubBox>{t('calendar:list.noReminders')}</StubBox>;
};

export default CalendarViewRemindersEmptyStub;
