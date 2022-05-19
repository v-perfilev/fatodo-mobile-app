import React from 'react';
import {Text} from 'react-native';
import {flowRight} from 'lodash';
import FScrollView from '../../../components/surfaces/FScrollView';
import FCenter from '../../../components/surfaces/FCenter';
import withUserList from '../../../shared/hocs/withLists/withUserList';

const OutcomingRequestList = () => {
  return (
    <FScrollView>
      <FCenter grow>
        <Text>Contact List</Text>
      </FCenter>
    </FScrollView>
  );
};

export default flowRight([withUserList])(OutcomingRequestList);
