import {Divider, Text} from 'native-base';
import React from 'react';
import FCenter from '../../../components/surfaces/FCenter';

type ChatViewDateProps = {
  date: string;
};

const ChatViewDate = ({date}: ChatViewDateProps) => {
  return (
    <FCenter>
      <Divider bg="secondary.500" />
      <Text color="primary.500" fontWeight="bold">
        {date}
      </Text>
      <Divider bg="secondary.500" />
    </FCenter>
  );
};

export default ChatViewDate;
