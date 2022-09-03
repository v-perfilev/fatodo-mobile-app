import React from 'react';
import {useTranslation} from 'react-i18next';
import StubBox from '../../../components/surfaces/StubBox';

const ContactListStub = () => {
  const {t} = useTranslation();

  return <StubBox mb="55px">{t('contact:relations.relationsNotFound')}</StubBox>;
};

export default ContactListStub;
