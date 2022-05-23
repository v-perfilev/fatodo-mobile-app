import React from 'react';
import {useTranslation} from 'react-i18next';
import {Text} from 'native-base';
import FCenter from '../../../components/surfaces/FCenter';

const ContactListStub = () => {
  const {t} = useTranslation();

  return (
    <FCenter grow mb="60px">
      <Text>{t('contact:relations.relationsNotFound')}</Text>
    </FCenter>
  );
};

export default ContactListStub;
