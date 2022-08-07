import React from 'react';
import {useTranslation} from 'react-i18next';
import StubBox from '../../../components/surfaces/StubBox';

const ChatListStub = () => {
  const {t} = useTranslation();

  return <StubBox>{t('chat:list.chatsNotFound')}</StubBox>;
};

export default ChatListStub;
