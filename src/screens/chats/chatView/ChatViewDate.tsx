import {Text} from 'native-base';
import React from 'react';
import FCenter from '../../../components/boxes/FCenter';
import Separator from '../../../components/layouts/Separator';

type ChatViewDateProps = {
  date: string;
};

const ChatViewDate = ({date}: ChatViewDateProps) => {
  return (
    <FCenter py="2">
      <Separator bg="secondary.500" />
      <Text color="primary.500" fontWeight="bold">
        {date}
      </Text>
      <Separator bg="secondary.500" />
    </FCenter>
  );
};

export default ChatViewDate;
