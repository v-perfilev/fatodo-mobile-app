import {Text} from 'native-base';
import React from 'react';
import FCenter from '../../../components/boxes/FCenter';

type ChatViewDateProps = {
  date: string;
};

const ChatViewDate = ({date}: ChatViewDateProps) => {
  return (
    <FCenter p="2">
      <Text color="primary.500" fontWeight="bold">
        {date}
      </Text>
    </FCenter>
  );
};

export default ChatViewDate;
