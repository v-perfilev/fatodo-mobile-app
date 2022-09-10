import React from 'react';
import {useTranslation} from 'react-i18next';
import StubBox from '../../../components/surfaces/StubBox';
import {HEADER_HEIGHT} from '../../../constants';

const ChatListStub = () => {
  const {t} = useTranslation();

  return <StubBox paddingBottom={HEADER_HEIGHT + 50}>{t('chat:list.chatsNotFound')}</StubBox>;
};

export default ChatListStub;
