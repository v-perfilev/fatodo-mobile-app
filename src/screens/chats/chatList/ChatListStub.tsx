import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {Text} from 'native-base';
import FCenter from '../../../components/boxes/FCenter';

const ChatListStub: FC = () => {
  const {t} = useTranslation();

  return (
    <FCenter grow mb="60px">
      <Text>{t('chat:list.chatsNotFound')}</Text>
    </FCenter>
  );
};

export default ChatListStub;
