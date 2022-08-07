import React from 'react';
import {useTranslation} from 'react-i18next';
import StubBox from '../../../components/surfaces/StubBox';

const IncomingRequestListStub = () => {
  const {t} = useTranslation();

  return <StubBox>{t('contact:incoming.requestsNotFound')}</StubBox>;
};

export default IncomingRequestListStub;
