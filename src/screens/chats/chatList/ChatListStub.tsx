import React from 'react';
import {useTranslation} from 'react-i18next';
import StubBox from '../../../components/surfaces/StubBox';
import {CHATS_FILTER_HEIGHT} from '../../../constants';

const ChatListStub = () => {
  const {t} = useTranslation();

  return <StubBox paddingBottom={CHATS_FILTER_HEIGHT}>{t('chat:list.chatsNotFound')}</StubBox>;
};

export default ChatListStub;
