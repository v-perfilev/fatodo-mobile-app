import React, {FC} from 'react';
import {Text} from 'react-native';
import {Center} from 'native-base';
import {flowRight} from 'lodash';
import withHeader from '../../shared/hocs/withHeader';

const ChatList: FC = () => {
  return (
    <Center safeArea w="100%" h="100%">
      <Text>Chat List</Text>
    </Center>
  );
};

export default flowRight([withHeader])(ChatList);
