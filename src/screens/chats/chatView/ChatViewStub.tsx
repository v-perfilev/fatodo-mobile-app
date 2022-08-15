import React from 'react';
import {useTranslation} from 'react-i18next';
import StubBox from '../../../components/surfaces/StubBox';

const ChatViewStub = () => {
  const {t} = useTranslation();

  return <StubBox inverted>{t('chat:view.messagesNotFound')}</StubBox>;
};

export default ChatViewStub;
