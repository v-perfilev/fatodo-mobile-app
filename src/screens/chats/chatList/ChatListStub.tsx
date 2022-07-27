import React from 'react';
import {useTranslation} from 'react-i18next';
import {Text} from 'native-base';
import FCenter from '../../../components/boxes/FCenter';

const ChatListStub = () => {
  const {t} = useTranslation();

  return (
    <FCenter grow>
      <Text>{t('chat:list.chatsNotFound')}</Text>
    </FCenter>
  );
};

export default ChatListStub;
