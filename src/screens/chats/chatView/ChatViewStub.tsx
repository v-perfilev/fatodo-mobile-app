import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {Text} from 'native-base';
import FCenter from '../../../components/surfaces/FCenter';

const ChatViewStub: FC = () => {
  const {t} = useTranslation();

  return (
    <FCenter grow mb="60px">
      <Text>{t('chat:content.chatsNotFound')}</Text>
    </FCenter>
  );
};

export default ChatViewStub;
