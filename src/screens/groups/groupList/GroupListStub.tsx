import React from 'react';
import {useTranslation} from 'react-i18next';
import StubBox from '../../../components/surfaces/StubBox';

const GroupViewStub = () => {
  const {t} = useTranslation();

  return <StubBox>{t('group:list.groupsNotFound')}</StubBox>;
};

export default GroupViewStub;
