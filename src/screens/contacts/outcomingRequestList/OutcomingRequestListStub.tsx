import React from 'react';
import FCenter from '../../../components/surfaces/FCenter';
import {useTranslation} from 'react-i18next';
import {Text} from 'native-base';

const OutcomingRequestListStub = () => {
  const {t} = useTranslation();

  return (
    <FCenter grow>
      <Text>{t('contact:outcoming.requestsNotFound')}</Text>
    </FCenter>
  );
};

export default OutcomingRequestListStub;
