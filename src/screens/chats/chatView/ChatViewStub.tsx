import React from 'react';
import {useTranslation} from 'react-i18next';
import {Text} from 'native-base';
import FCenter from '../../../components/boxes/FCenter';

const ChatViewStub = () => {
  const {t} = useTranslation();

  return (
    <FCenter grow>
      <Text>{t('chat:view.messagesNotFound')}</Text>
    </FCenter>
  );
};

export default ChatViewStub;
