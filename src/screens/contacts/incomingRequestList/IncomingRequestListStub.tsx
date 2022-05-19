import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {Text} from 'native-base';
import FCenter from '../../../components/surfaces/FCenter';

const ContactListStub: FC = () => {
  const {t} = useTranslation();

  return (
    <FCenter grow>
      <Text>{t('contact:incoming.requestsNotFound')}</Text>
    </FCenter>
  );
};

export default ContactListStub;
