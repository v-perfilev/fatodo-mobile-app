import React, {FC} from 'react';
import {Text} from 'react-native';
import {Center} from 'native-base';
import {flowRight} from 'lodash';
import withHeader from '../../shared/hocs/withHeader';

const GroupList: FC = () => {
  return (
    <Center safeArea w="100%" h="100%">
      <Text>Group List</Text>
    </Center>
  );
};

export default flowRight([withHeader])(GroupList);
