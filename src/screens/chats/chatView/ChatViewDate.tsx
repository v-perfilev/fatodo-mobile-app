import {Text} from 'native-base';
import React from 'react';
import FCenter from '../../../components/boxes/FCenter';
import Separator from '../../../components/layouts/Separator';

type ChatViewDateProps = {
  date: string;
};

const ChatViewDate = ({date}: ChatViewDateProps) => {
  return (
    <FCenter px="4" py="2">
      <Text color="primary.500" fontWeight="bold">
        {date}
      </Text>
      <Separator background="primary.500" mx="1" mt="1" />
    </FCenter>
  );
};

export default ChatViewDate;
