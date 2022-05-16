import React from 'react';
import {Text} from 'react-native';
import {flowRight} from 'lodash';
import withHeader from '../../../shared/hocs/withHeader';
import FScrollView from '../../../components/surfaces/FScrollView';
import FCenter from '../../../components/surfaces/FCenter';

const ChatList = () => {
  return (
    <FScrollView>
      <FCenter grow>
        <Text>Chat List</Text>
      </FCenter>
    </FScrollView>
  );
};

export default flowRight([withHeader])(ChatList);
