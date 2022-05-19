import React from 'react';
import {Text} from 'react-native';
import FCenter from '../../../components/surfaces/FCenter';
import {useTranslation} from 'react-i18next';

const OutcomingRequestListStub = () => {
  const {t} = useTranslation();

  return (
    <FCenter grow>
      <Text>{t('contact:outcoming.requestsNotFound')}</Text>
    </FCenter>
  );
};

export default OutcomingRequestListStub;
