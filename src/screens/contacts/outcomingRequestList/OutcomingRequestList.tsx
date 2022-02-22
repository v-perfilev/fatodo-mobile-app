import React, {FC} from 'react';
import {Text} from 'react-native';
import {Center} from 'native-base';
import withHeader from '../../../shared/hocs/withHeader';
import {flowRight} from 'lodash';

const OutcomingRequestList: FC = () => {
  return (
    <Center safeArea w="100%" h="100%">
      <Text>Contact List</Text>
    </Center>
  );
};

export default flowRight([withHeader])(OutcomingRequestList);
