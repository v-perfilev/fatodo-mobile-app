import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {Text} from 'native-base';
import FCenter from '../../../components/surfaces/FCenter';

const ChatListStub: FC = () => {
  const {t} = useTranslation();

  return (
    <FCenter grow mb="60px">
      <Text>{t('chat:control.chatsNotFound')}</Text>
    </FCenter>
  );
};

export default ChatListStub;
