import React from 'react';
import {Text} from 'react-native';
import withHeader from '../../../shared/hocs/withHeader';
import {flowRight} from 'lodash';
import FScrollView from '../../../components/surfaces/FScrollView';
import FCenter from '../../../components/surfaces/FCenter';

const IncomingRequestList = () => {
  return (
    <FScrollView>
      <FCenter grow>
        <Text>Contact List</Text>
      </FCenter>
    </FScrollView>
  );
};

export default flowRight([withHeader])(IncomingRequestList);
