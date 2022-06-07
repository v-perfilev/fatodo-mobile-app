import React from 'react';
import {useTranslation} from 'react-i18next';
import {IBoxProps, Text} from 'native-base';
import FCenter from '../../../components/boxes/FCenter';

type ChatViewStubProps = IBoxProps;

const ChatViewStub = (props: ChatViewStubProps) => {
  const {t} = useTranslation();

  return (
    <FCenter grow {...props}>
      <Text>{t('chat:view.messagesNotFound')}</Text>
    </FCenter>
  );
};

export default ChatViewStub;
