import React, {FC} from 'react';
import {Box, Text} from 'native-base';
import {flowRight} from 'lodash';
import withHeader from '../../../shared/hocs/withHeader';

const GroupEdit: FC = () => {
  return (
    <Box flex="1">
      <Text>Page</Text>
    </Box>
  );
};

export default flowRight([withHeader])(GroupEdit);
