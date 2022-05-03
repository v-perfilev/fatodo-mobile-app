import React from 'react';
import {Box, Text} from 'native-base';
import {flowRight} from 'lodash';
import withHeader from '../../../shared/hocs/withHeader';

const ItemCreate = () => {
  return (
    <Box flex="1">
      <Text>Page</Text>
    </Box>
  );
};

export default flowRight([withHeader])(ItemCreate);
