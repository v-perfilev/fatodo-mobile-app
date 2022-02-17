import {UserAccount} from '../../../../models/User';
import React, {FC} from 'react';
import {useGroupViewContext} from '../../../../shared/contexts/viewContexts/groupViewContext';
import {Box, Text} from 'native-base';

type Props = {
  account: UserAccount;
  sorting: boolean;
  drag: () => void;
};

const GroupListCardHeader: FC<Props> = ({account, sorting, drag}: Props) => {
  const {group} = useGroupViewContext();

  return (
    <Box flex={1} bg="primary.500" mt={10}>
      <Box>
        <Text>{group.title}</Text>
      </Box>
    </Box>
  );
};

export default GroupListCardHeader;
