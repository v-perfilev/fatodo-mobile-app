import React from 'react';
import {useTranslation} from 'react-i18next';
import StubBox from '../../../components/surfaces/StubBox';

const OutcomingRequestListStub = () => {
  const {t} = useTranslation();

  return <StubBox>{t('contact:outcoming.requestsNotFound')}</StubBox>;
};

export default OutcomingRequestListStub;
