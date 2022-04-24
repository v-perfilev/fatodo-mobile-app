import React, {FC} from 'react';
import {Box} from 'native-base';
import {flowRight} from 'lodash';
import withHeader from '../../../shared/hocs/withHeader';
import GroupForm from '../groupForm/GroupForm';

const GroupCreate: FC = () => {
  return (
    <Box flex="1">
      <GroupForm />
    </Box>
  );
};

export default flowRight([withHeader])(GroupCreate);
